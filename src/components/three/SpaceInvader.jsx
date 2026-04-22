import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- CONSTANTS & HELPERS ---
const BASE_SCORE_STEP = 150;
const getThreshold = (lvl) => BASE_SCORE_STEP * (Math.pow(2, lvl) - 1);
const getPrevThreshold = (lvl) => lvl === 1 ? 0 : getThreshold(lvl - 1);

const BASE_POWERS = [
  { id: 'speed', title: 'Motor de Impulso', desc: 'Aumenta la velocidad de movimiento de la nave.', color: '#00d4ff' },
  { id: 'firerate', title: 'Sobrecarga Térmica', desc: 'Reduce el tiempo de recarga entre disparos.', color: '#eab308' },
  { id: 'multishot', title: 'Cañón Disperso', desc: 'Añade proyectiles adicionales al disparar.', color: '#ec4899' },
  { id: 'pierce', title: 'Láser Perforante', desc: 'Los láseres hacen el doble de daño.', color: '#10b981' }
];

const ADVANCED_POWERS = [
  { id: 'missile', title: 'Lanzamisiles', desc: 'Añade misiles. Daño de área masivo (AoE). Pulsa C para cambiar.', color: '#f97316' },
  { id: 'cannon', title: 'Cañón de Plasma', desc: 'Añade cañón. Rayo que arrasa líneas enemigas. Pulsa C.', color: '#22d3ee' },
  { id: 'grenade', title: 'Granada (ESP)', desc: 'TECLA X: Lanza explosivo para despejar el área (Cooldown: 8s).', color: '#ef4444' },
  { id: 'blackhole', title: 'Agujero Negro (ULT)', desc: 'TECLA Z: Atrae y aniquila todo en pantalla. (Cooldown: 25s).', color: '#a855f7' }
];

function GameLogic({ gameState, setGameState, score, setScore, level, setLevel, playerStats, setPlayerStats, onLevelUp, onGameOver }) {
  const { viewport, scene } = useThree();
  const playerRef = useRef();
  
  // Lists
  const lasers = useRef([]);
  const enemyLasers = useRef([]);
  const enemies = useRef([]);
  const explosionParticles = useRef([]);
  const activeSpecials = useRef([]);
  
  // Timers
  const lastShotTime = useRef(0);
  const lastSpawnTime = useRef(0);
  const lastGrenadeTime = useRef(-100);
  const lastBlackHoleTime = useRef(-100);
  
  // Inputs
  const targetX = useRef(0);
  const isPointerDown = useRef(false);

  // Boss State
  const isBossLevel = level % 10 === 0;
  const bossMeshRef = useRef();
  const bossHpBgRef = useRef();
  const bossHpBarRef = useRef();
  const bossState = useRef({ active: false, hp: 0, maxHp: 0, direction: 1, lastShot: 0, exploding: false, explosionTime: 0, type: 1 });

  // Initialize Boss
  useEffect(() => {
    if (isBossLevel && gameState === 'PLAYING' && !bossState.current.active && !bossState.current.exploding) {
      const levelGoal = getThreshold(level) - getPrevThreshold(level);
      const maxHp = levelGoal * 5.0; 
      const bType = level <= 10 ? 1 : (level <= 20 ? 2 : 3);
      
      bossState.current = { active: true, hp: maxHp, maxHp: maxHp, direction: 1, lastShot: 0, exploding: false, explosionTime: 0, type: bType };
      
      if (bossMeshRef.current) {
        bossMeshRef.current.position.set(0, viewport.height / 2 - 1, 0);
        bossMeshRef.current.visible = true;
        // Color based on type
        const bossColor = bType === 1 ? '#ef4444' : (bType === 2 ? '#a855f7' : '#f97316');
        bossMeshRef.current.material.color.set(bossColor);
        if (bossHpBarRef.current) bossHpBarRef.current.material.color.set(bossColor);
      }
      if (bossHpBgRef.current) bossHpBgRef.current.visible = true;
      if (bossHpBarRef.current) bossHpBarRef.current.visible = true;
      enemies.current.forEach(e => { if (e && e.parent) { e.parent.remove(e); e.userData.active = false; }});
      enemies.current = [];
    }
  }, [level, isBossLevel, gameState, viewport.height]);

  // Geometries and materials
  const smallGeo = useMemo(() => new THREE.ConeGeometry(0.25, 0.4, 4), []); 
  const mediumGeo = useMemo(() => new THREE.TorusGeometry(0.3, 0.08, 16, 32), []); 
  const largeGeo = useMemo(() => new THREE.TorusKnotGeometry(0.35, 0.1, 64, 16), []); 
  const rareGeo = useMemo(() => new THREE.IcosahedronGeometry(0.5, 1), []); 
  const bossGeo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 1), []);
  
  const smallMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#7c3aed', wireframe: true }), []); 
  const mediumMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ec4899', wireframe: true }), []); 
  const largeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#f97316', wireframe: true }), []); 
  const rareMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#facc15', wireframe: true }), []); 
  const bossMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ef4444', wireframe: true }), []); // Base, color changed dynamically

  const logoMaterials = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const urls = [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    ];
    return urls.map(url => new THREE.SpriteMaterial({ map: loader.load(url), transparent: true, opacity: 0.9 }));
  }, []);

  // Weapon Geometries
  const laserGeo = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, 0.5), []);
  const missileGeo = useMemo(() => new THREE.ConeGeometry(0.08, 0.4, 8), []);
  const cannonGeo = useMemo(() => new THREE.BoxGeometry(0.4, 1.0, 0.1), []);
  
  const laserMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00d4ff' }), []);
  const missileMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#f97316', wireframe: true }), []);
  const cannonMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.8 }), []);
  const enemyLaserMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ef4444' }), []);

  const objectsGroupRef = useRef();

  const triggerGrenade = () => {
    const now = stateRef.current.clock.elapsedTime;
    if (now - lastGrenadeTime.current < 8.0) return;
    lastGrenadeTime.current = now;
    const px = playerRef.current ? playerRef.current.position.x : 0;
    const py = playerRef.current ? playerRef.current.position.y + 0.5 : 0;
    const gMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), rareMat);
    gMesh.position.set(px, py, 0);
    objectsGroupRef.current.add(gMesh);
    activeSpecials.current.push({ type: 'grenade', mesh: gMesh, spawnTime: now, exploding: false });
  };

  const triggerBlackHole = () => {
    const now = stateRef.current.clock.elapsedTime;
    if (now - lastBlackHoleTime.current < 25.0) return;
    lastBlackHoleTime.current = now;
    const bhMesh = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.3, 16, 64), new THREE.MeshBasicMaterial({ color: '#a855f7', wireframe: true }));
    bhMesh.position.set(0, 0, 0);
    objectsGroupRef.current.add(bhMesh);
    activeSpecials.current.push({ type: 'blackhole', mesh: bhMesh, spawnTime: now });
  };

  const stateRef = useRef(); 

  // Input listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement) {
        const sensitivity = 0.015 * playerStats.speed;
        targetX.current += e.movementX * sensitivity;
        const bound = viewport.width / 2 - 0.4;
        targetX.current = Math.max(-bound, Math.min(bound, targetX.current));
      }
    };
    const handlePointerDown = (e) => { if (document.pointerLockElement && gameState === 'PLAYING') isPointerDown.current = true; };
    const handlePointerUp = (e) => { isPointerDown.current = false; };
    const handleKeyDown = (e) => {
      if (gameState !== 'PLAYING') return;
      if (e.code === 'KeyX' && playerStats.hasGrenade) triggerGrenade(); // X -> Bomba
      if (e.code === 'KeyZ' && playerStats.hasBlackHole) triggerBlackHole(); // Z -> Definitiva
      if (e.code === 'KeyC') { // C -> Switch Weapon
        const weapons = playerStats.unlockedWeapons;
        if (weapons.length > 1) {
          const idx = weapons.indexOf(playerStats.weapon);
          const nextIdx = (idx + 1) % weapons.length;
          setPlayerStats(p => ({ ...p, weapon: weapons[nextIdx] }));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, viewport.width, playerStats, setPlayerStats]);

  useEffect(() => {
    return () => {
      enemies.current.forEach(e => { if (e && e.parent) e.parent.remove(e); });
      lasers.current.forEach(l => { if (l && l.parent) l.parent.remove(l); });
      enemyLasers.current.forEach(l => { if (l && l.parent) l.parent.remove(l); });
      explosionParticles.current.forEach(p => { if (p && p.parent) p.parent.remove(p); });
      activeSpecials.current.forEach(s => { if (s.mesh && s.mesh.parent) s.mesh.parent.remove(s.mesh); });
    };
  }, []);

  const shoot = () => {
    const now = performance.now();
    // Fire Rate inicial más bajo: Base 300ms en lugar de 150ms
    let cooldown = Math.max(80, 300 - (playerStats.fireRate * 30)); 
    if (playerStats.weapon === 'missile') cooldown = 450;
    if (playerStats.weapon === 'cannon') cooldown = 600;
    
    if (now - lastShotTime.current < cooldown) return;
    lastShotTime.current = now;

    const px = playerRef.current ? playerRef.current.position.x : 0;
    const py = playerRef.current ? playerRef.current.position.y + 0.5 : -viewport.height/2 + 1;

    const fireLaser = (xOffset, angle) => {
      let proj = lasers.current.find(l => !l.userData.active);
      if (!proj) {
        proj = new THREE.Mesh(laserGeo, laserMat);
        if (objectsGroupRef.current) {
          objectsGroupRef.current.add(proj);
          lasers.current.push(proj);
        }
      } else {
        proj.visible = true;
      }
      
      if (playerStats.weapon === 'missile') {
        proj.geometry = missileGeo; proj.material = missileMat;
      } else if (playerStats.weapon === 'cannon') {
        proj.geometry = cannonGeo; proj.material = cannonMat;
      } else {
        proj.geometry = laserGeo; proj.material = laserMat;
      }

      proj.position.set(px + xOffset, py, 0);
      proj.rotation.set(0, 0, angle);
      proj.scale.set(1, 1, 1);
      proj.userData = { active: true, angle: angle, type: playerStats.weapon, hitList: new Set() };
    };

    if (playerStats.weapon === 'cannon') {
      fireLaser(0, 0); 
    } else {
      fireLaser(0, 0); 
      if (playerStats.multiShot >= 2) { fireLaser(-0.2, 0.1); fireLaser(0.2, -0.1); }
      if (playerStats.multiShot >= 3) { fireLaser(-0.4, 0.2); fireLaser(0.4, -0.2); }
    }
  };

  const spawnEnemy = (forceHeavyChance) => {
    const spawnBound = viewport.width / 2 - 0.5;
    const xPos = (Math.random() * 2 - 1) * spawnBound;
    const yPos = viewport.height / 2 + 1;
    
    const typeRand = Math.random() * 100;
    let tConfig;
    if (typeRand <= 0.3) tConfig = { geo: rareGeo, mat: rareMat, scorePct: 0.35, hpPct: 0.40, hitRadius: 0.5 };
    else if (typeRand <= 17.3 || forceHeavyChance) tConfig = { geo: largeGeo, mat: largeMat, scorePct: 0.17, hpPct: 0.22, hitRadius: 0.6 };
    else if (typeRand <= 50.3) tConfig = { geo: mediumGeo, mat: mediumMat, scorePct: 0.07, hpPct: 0.12, hitRadius: 0.4 };
    else tConfig = { geo: smallGeo, mat: smallMat, scorePct: 0.03, hpPct: 0.08, hitRadius: 0.25 };

    const mesh = new THREE.Mesh(tConfig.geo, tConfig.mat);
    mesh.position.set(xPos, yPos, 0);
    mesh.rotation.set(Math.random(), Math.random(), Math.random());

    if (Math.random() > 0.5) {
      const mat = logoMaterials[Math.floor(Math.random() * logoMaterials.length)];
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(0.35, 0.35, 0.35); 
      mesh.add(sprite);
    }

    const levelGoal = getThreshold(level) - getPrevThreshold(level);
    mesh.userData = { 
      active: true, seed: Math.random() * 100,
      speed: (2.0 - tConfig.hitRadius) + Math.random(),
      hp: Math.ceil(levelGoal * tConfig.hpPct),
      maxHp: Math.ceil(levelGoal * tConfig.hpPct),
      scoreValue: Math.ceil(levelGoal * tConfig.scorePct),
      hitRadius: tConfig.hitRadius,
      uuid: Math.random().toString() 
    };
    if (objectsGroupRef.current) { objectsGroupRef.current.add(mesh); enemies.current.push(mesh); }
  };

  const bossShoot = (px, py, angles) => {
    angles.forEach(angle => {
      let laser = enemyLasers.current.find(l => !l.userData.active);
      if (!laser) {
        laser = new THREE.Mesh(laserGeo, enemyLaserMat);
        if (objectsGroupRef.current) {
          objectsGroupRef.current.add(laser);
          enemyLasers.current.push(laser);
        }
      } else {
        laser.visible = true;
      }
      if (laser) {
        const xOffset = angle * -2.0;
        laser.position.set(px + xOffset, py, 0);
        laser.rotation.z = angle;
        laser.userData.active = true;
        laser.userData.angle = angle;
      }
    });
  };

  useFrame((state, delta) => {
    stateRef.current = state;
    if (gameState !== 'PLAYING') return;

    let scoreDelta = 0;

    if (isPointerDown.current || level > 10) {
      if (isPointerDown.current) shoot();
    }

    if (playerRef.current) {
      playerRef.current.position.x += (targetX.current - playerRef.current.position.x) * 15 * delta;
      const tilt = (targetX.current - playerRef.current.position.x) * 0.8;
      playerRef.current.rotation.z = -tilt;
      playerRef.current.rotation.y = tilt * 0.5;
    }

    if (!isBossLevel) {
      const spawnDelay = Math.max(0.2, 1.2 - (level * 0.1));
      if (state.clock.elapsedTime - lastSpawnTime.current > spawnDelay) {
        lastSpawnTime.current = state.clock.elapsedTime;
        spawnEnemy(false);
      }
    }

    // Specials Logic
    activeSpecials.current.forEach(spec => {
      if (spec.type === 'grenade') {
        if (!spec.exploding) {
          spec.mesh.position.y += delta * 6;
          spec.mesh.rotation.z += delta * 10;
          if (state.clock.elapsedTime - spec.spawnTime > 1.2) {
            spec.exploding = true;
            spec.mesh.geometry = new THREE.IcosahedronGeometry(4, 1);
            spec.mesh.material = new THREE.MeshBasicMaterial({ color: '#ef4444', wireframe: true, transparent: true, opacity: 0.8 });
            enemies.current.forEach(e => {
              if (e.userData.active && e.position.distanceTo(spec.mesh.position) < 4.5) e.userData.hp -= 99999; 
            });
            if (bossMeshRef.current && bossState.current.active && bossMeshRef.current.position.distanceTo(spec.mesh.position) < 5.0) {
              bossState.current.hp -= (getThreshold(level) - getPrevThreshold(level)) * 0.5; 
            }
          }
        } else {
          spec.mesh.scale.addScalar(delta * 4);
          spec.mesh.material.opacity -= delta * 1.5;
          if (spec.mesh.material.opacity <= 0) {
            if(spec.mesh.parent) spec.mesh.parent.remove(spec.mesh);
            spec.done = true;
          }
        }
      } else if (spec.type === 'blackhole') {
        spec.mesh.rotation.z += delta * 2;
        spec.mesh.rotation.x += delta * 1;
        enemies.current.forEach(e => {
          if (e.userData.active) {
            const dir = new THREE.Vector3().subVectors(spec.mesh.position, e.position);
            const dist = dir.length();
            if (dist > 0) {
              dir.normalize();
              e.position.addScaledVector(dir, delta * (8.0 / Math.max(0.5, dist)));
              if (dist < 1.0) e.userData.hp = -99999; 
            }
          }
        });
        if (state.clock.elapsedTime - spec.spawnTime > 4.0) {
          if(spec.mesh.parent) spec.mesh.parent.remove(spec.mesh);
          spec.done = true;
        }
      }
    });
    activeSpecials.current = activeSpecials.current.filter(s => !s.done);

    // Boss Logic
    if (isBossLevel) {
      if (bossState.current.active && bossMeshRef.current) {
        const boss = bossMeshRef.current;
        const bState = bossState.current;
        
        // Behaviors by type
        let moveSpeed = bState.type === 1 ? 2 : (bState.type === 2 ? 3 : 4.5);
        if (bState.type === 3 && Math.random() < 0.03) bState.direction *= -1; // Erratic
        
        boss.position.x += bState.direction * moveSpeed * delta;
        boss.rotation.x += delta * 0.5; boss.rotation.y += delta * 0.5;
        if (boss.position.x > viewport.width / 2 - 1.5) bState.direction = -1;
        if (boss.position.x < -viewport.width / 2 + 1.5) bState.direction = 1;

        let fireCooldown = bState.type === 1 ? 1.0 : (bState.type === 2 ? 0.7 : 0.3);
        if (state.clock.elapsedTime - bState.lastShot > fireCooldown) { 
          bState.lastShot = state.clock.elapsedTime;
          if (bState.type === 1) bossShoot(boss.position.x, boss.position.y - 1.2, [0, -0.15, 0.15]);
          if (bState.type === 2) {
             bossShoot(boss.position.x, boss.position.y - 1.2, [0, -0.15, 0.15, -0.3, 0.3]);
             if (Math.random() < 0.3) spawnEnemy(false); // Rain rocks
          }
          if (bState.type === 3) {
             bossShoot(boss.position.x, boss.position.y - 1.2, [0]); // rapid fire
             if (Math.random() < 0.1) spawnEnemy(true); // Big missiles
          }
        }

        if (bossHpBarRef.current) {
          const hpRatio = Math.max(0, bState.hp / bState.maxHp);
          bossHpBarRef.current.scale.x = Math.max(0.001, 3 * hpRatio);
          bossHpBarRef.current.position.x = (-3 + (3 * hpRatio)) / 2;
        }
      } else if (bossState.current.exploding) {
        explosionParticles.current.forEach(p => {
          p.position.addScaledVector(p.userData.velocity, delta);
          p.rotation.x += p.userData.rotSpeed.x * delta * 5;
        });
        if (state.clock.elapsedTime - bossState.current.explosionTime > 2.0) {
          bossState.current.exploding = false;
          explosionParticles.current.forEach(p => { if (p.parent) p.parent.remove(p); });
          explosionParticles.current = [];
          onLevelUp(false);
        }
      }
    }

    // Player Lasers
    lasers.current.forEach((laser) => {
      if (!laser.userData.active) return;
      const speed = laser.userData.type === 'missile' ? 8 : (laser.userData.type === 'cannon' ? 25 : 18);
      laser.position.y += Math.cos(laser.userData.angle) * delta * speed;
      laser.position.x -= Math.sin(laser.userData.angle) * delta * speed;
      
      if (laser.userData.type === 'missile') laser.rotation.y += delta * 10;
      
      if (laser.position.y > viewport.height / 2 + 1) {
        laser.userData.active = false; laser.visible = false;
      }
      
      const applyDamageToTarget = (targetHpRef, distance, isBoss) => {
        let hit = false;
        const levelGoal = getThreshold(level) - getPrevThreshold(level);
        let baseDamage = levelGoal * 0.05;

        if (laser.userData.type === 'missile') {
          if (distance < (isBoss ? 1.5 : 0.6)) {
            hit = true;
            laser.userData.active = false; laser.visible = false;
            baseDamage *= 3.0; 
          }
        } else if (laser.userData.type === 'cannon') {
          if (distance < (isBoss ? 1.8 : 0.8)) {
            const tId = isBoss ? 'BOSS' : targetHpRef.uuid;
            if (!laser.userData.hitList.has(tId)) {
              laser.userData.hitList.add(tId);
              hit = true;
              baseDamage *= 2.0; 
            }
          }
        } else {
          if (distance < (isBoss ? 1.4 : targetHpRef.hitRadius)) {
            hit = true;
            laser.userData.active = false; laser.visible = false;
          }
        }

        if (hit) {
          const finalDmg = playerStats.pierce ? baseDamage * 2 : baseDamage;
          targetHpRef.hp -= finalDmg;
          if (laser.userData.type === 'missile') {
             enemies.current.forEach(otherE => {
                if (otherE.userData.active && otherE.position.distanceTo(laser.position) < 2.5) {
                   otherE.userData.hp -= finalDmg * 0.5; 
                }
             });
          }
          return true; 
        }
        return false;
      };

      if (isBossLevel && bossState.current.active && bossMeshRef.current) {
        if (applyDamageToTarget(bossState.current, bossMeshRef.current.position.distanceTo(laser.position), true)) {
          scoreDelta += 10; 
          if (bossState.current.hp <= 0) {
            bossState.current.active = false; bossMeshRef.current.visible = false;
            if (bossHpBgRef.current) bossHpBgRef.current.visible = false;
            if (bossHpBarRef.current) bossHpBarRef.current.visible = false;
            scoreDelta += 500;
            bossState.current.exploding = true; bossState.current.explosionTime = state.clock.elapsedTime;
            for(let i=0; i<40; i++) {
              const mesh = new THREE.Mesh(smallGeo, bossMat); 
              mesh.position.copy(bossMeshRef.current.position);
              mesh.material.color.set(bossMeshRef.current.material.color);
              mesh.userData = { velocity: new THREE.Vector3((Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*5), rotSpeed: new THREE.Vector3(Math.random(), Math.random(), Math.random()) };
              if (objectsGroupRef.current) { objectsGroupRef.current.add(mesh); explosionParticles.current.push(mesh); }
            }
          }
        }
      }

      if (!isBossLevel) {
        enemies.current.forEach(enemy => {
          if (!enemy.userData.active) return;
          if (applyDamageToTarget(enemy.userData, enemy.position.distanceTo(laser.position), false)) {
            const scale = 0.65 + (enemy.userData.hp / enemy.userData.maxHp) * 0.35;
            enemy.scale.set(scale, scale, scale);
            if (enemy.userData.hp <= 0) {
              enemy.userData.active = false; enemy.visible = false;
              scoreDelta += enemy.userData.scoreValue;
            }
          }
        });
      }
    });

    if (!isBossLevel) {
       enemies.current.forEach(enemy => {
          if (enemy.userData.active && enemy.userData.hp <= 0) {
             enemy.userData.active = false; enemy.visible = false;
             scoreDelta += enemy.userData.scoreValue;
          }
       });
    }

    enemyLasers.current.forEach((laser) => {
      if (!laser.userData.active) return;
      laser.position.y -= Math.cos(laser.userData.angle) * delta * 10;
      laser.position.x -= Math.sin(laser.userData.angle) * delta * 10;
      if (laser.position.y < -viewport.height / 2 - 1) { laser.userData.active = false; laser.visible = false; }
      if (playerRef.current && laser.userData.active && playerRef.current.position.distanceTo(laser.position) < 0.5) {
        laser.userData.active = false; laser.visible = false;
        scoreDelta -= 100;
      }
    });

    if (!isBossLevel) {
      enemies.current.forEach((enemy) => {
        if (!enemy.userData.active) return;
        enemy.position.y -= delta * enemy.userData.speed;
        enemy.rotation.x += delta * 0.5; enemy.rotation.y += delta * 0.8;
        enemy.position.x += Math.sin(state.clock.elapsedTime * 2 + enemy.userData.seed) * delta * 0.5;
        if (enemy.position.y < -viewport.height / 2 - 1) {
          enemy.userData.active = false; enemy.visible = false;
          scoreDelta -= enemy.userData.scoreValue; 
        }
      });
    }

    if (scoreDelta !== 0) {
      const newScore = score + scoreDelta;
      if (newScore < 0) onGameOver();
      else {
        setScore(newScore);
        if (!isBossLevel && newScore >= getThreshold(level)) {
          const nextLevel = level + 1;
          const isSilent = !(nextLevel === 4 || nextLevel === 8 || nextLevel % 10 === 1);
          onLevelUp(isSilent);
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={objectsGroupRef} />
      {isBossLevel && (
        <group position={[0, viewport.height / 2 - 0.2, 0]}>
          <mesh ref={bossHpBgRef} visible={false}>
            <planeGeometry args={[3, 0.1]} />
            <meshBasicMaterial color="#440000" />
          </mesh>
          <mesh ref={bossHpBarRef} visible={false}>
            <planeGeometry args={[1, 0.1]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}
      <mesh ref={bossMeshRef} visible={false}>
        <primitive object={bossGeo} />
        <primitive object={bossMat} />
      </mesh>
      {(gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'UPGRADE') && (
        <group ref={playerRef} position={[0, -viewport.height / 2 + 1, 0]}>
          <mesh>
            <coneGeometry args={[0.3, 0.8, 4]} />
            <meshBasicMaterial color={playerStats.weapon === 'cannon' ? '#22d3ee' : (playerStats.weapon === 'missile' ? '#f97316' : '#00d4ff')} wireframe />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.15, 0.4, 4]} />
            <meshBasicMaterial color="#7c3aed" wireframe opacity={0.6} transparent />
          </mesh>
        </group>
      )}
    </>
  );
}

export default function SpaceInvader() {
  const [gameState, setGameState] = useState('START'); 
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [playerStats, setPlayerStats] = useState({ speed: 1, fireRate: 1, multiShot: 1, pierce: false, weapon: 'laser', unlockedWeapons: ['laser'], hasGrenade: false, hasBlackHole: false });
  const [upgradeCards, setUpgradeCards] = useState([]);
  const [gameId, setGameId] = useState(0);
  const containerRef = useRef();
  const intentionalUnlockRef = useRef(false);

  useEffect(() => {
    const handleLockChange = () => {
      if (document.pointerLockElement !== containerRef.current) {
        if (intentionalUnlockRef.current) intentionalUnlockRef.current = false;
        else if (gameState === 'PLAYING') setGameState('PAUSED');
      }
    };
    document.addEventListener('pointerlockchange', handleLockChange);
    return () => document.removeEventListener('pointerlockchange', handleLockChange);
  }, [gameState]);

  const requestLockAndPlay = () => {
    if (containerRef.current) {
      containerRef.current.requestPointerLock();
      setGameState('PLAYING');
    }
  };

  const handleLevelUp = (isSilent) => {
    if (isSilent) setLevel(l => l + 1);
    else {
      intentionalUnlockRef.current = true; setGameState('UPGRADE');
      if (document.pointerLockElement) document.exitPointerLock();
    }
  };

  const handleGameOver = () => {
    intentionalUnlockRef.current = true; setGameState('GAME_OVER');
    if (document.pointerLockElement) document.exitPointerLock();
  };

  const resetGame = () => {
    setScore(0); setLevel(1);
    setPlayerStats({ speed: 1, fireRate: 1, multiShot: 1, pierce: false, weapon: 'laser', unlockedWeapons: ['laser'], hasGrenade: false, hasBlackHole: false });
    setGameId(id => id + 1);
    requestLockAndPlay();
  };

  useEffect(() => {
    if (gameState === 'UPGRADE') {
      let pool = [...BASE_POWERS];
      if (level > 10) pool = [...pool, ...ADVANCED_POWERS];
      
      if (playerStats.hasGrenade) pool = pool.filter(p => p.id !== 'grenade');
      if (playerStats.hasBlackHole) pool = pool.filter(p => p.id !== 'blackhole');
      if (playerStats.unlockedWeapons.includes('missile')) pool = pool.filter(p => p.id !== 'missile');
      if (playerStats.unlockedWeapons.includes('cannon')) pool = pool.filter(p => p.id !== 'cannon');

      const shuffled = pool.sort(() => 0.5 - Math.random());
      setUpgradeCards(shuffled.slice(0, 3));
    }
  }, [gameState, level, playerStats]);

  const selectUpgrade = (powerId) => {
    setPlayerStats(prev => {
      const newStats = { ...prev };
      if (powerId === 'speed') newStats.speed += 0.5;
      if (powerId === 'firerate') newStats.fireRate += 1;
      if (powerId === 'multishot') newStats.multiShot += 1;
      if (powerId === 'pierce') newStats.pierce = true;
      
      if (powerId === 'missile' || powerId === 'cannon') {
         if (!newStats.unlockedWeapons.includes(powerId)) newStats.unlockedWeapons.push(powerId);
         newStats.weapon = powerId; // Auto equip
      }
      
      if (powerId === 'grenade') newStats.hasGrenade = true;
      if (powerId === 'blackhole') newStats.hasBlackHole = true;
      return newStats;
    });
    setLevel(l => l + 1);
    requestLockAndPlay();
  };

  const isBossLevel = level % 10 === 0;
  const currentThreshold = getThreshold(level);
  const prevThreshold = getPrevThreshold(level);
  const progressPercent = Math.max(0, Math.min(100, ((score - prevThreshold) / (currentThreshold - prevThreshold)) * 100));

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', cursor: gameState === 'PLAYING' ? 'none' : 'default', overflow: 'hidden' }}>
      {(gameState !== 'START' && gameState !== 'GAME_OVER') && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, fontFamily: 'var(--font-mono)', pointerEvents: 'none' }}>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ width: isBossLevel ? '100%' : `${progressPercent}%`, height: '100%', background: isBossLevel ? '#ef4444' : 'var(--accent-cyan)', boxShadow: `0 0 10px ${isBossLevel ? '#ef4444' : 'var(--accent-cyan)'}`, transition: 'width 0.2s ease', animation: isBossLevel ? 'pulseGlow 1s infinite alternate' : 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', color: 'var(--accent-cyan)', textShadow: '0 0 10px var(--accent-cyan)' }}>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>SCORE: {score.toString().padStart(4, '0')}</div>
              <div style={{ fontSize: '0.8rem', color: isBossLevel ? '#ef4444' : 'var(--text-muted)' }}>{isBossLevel ? 'WARNING: BOSS LEVEL' : `LEVEL ${level}`}</div>
            </div>
            
            <div style={{ textAlign: 'right', opacity: 0.8 }}>
              {playerStats.unlockedWeapons.length > 1 && <div style={{ color: '#22d3ee', fontSize: '0.8rem' }}>[C] Cambiar Arma ({playerStats.weapon.toUpperCase()})</div>}
              {playerStats.hasGrenade && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>[X] Bomba</div>}
              {playerStats.hasBlackHole && <div style={{ color: '#a855f7', fontSize: '0.8rem' }}>[Z] Definitiva</div>}
            </div>
          </div>
        </div>
      )}

      {gameState === 'START' && (
        <div className="game-overlay">
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: 20 }}>NETWORK DEFENDER</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 300, marginBottom: 30 }}>Protege el sistema. Si tu puntuación llega a 0, se comprometerá la red.</p>
            <button className="btn-glow btn-glow-solid" onClick={requestLockAndPlay}>INICIAR SISTEMA</button>
          </div>
        </div>
      )}

      {gameState === 'GAME_OVER' && (
        <div className="game-overlay" style={{ background: 'rgba(20, 5, 5, 0.9)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', fontSize: '35rem', lineHeight: 1, color: 'rgba(239, 68, 68, 0.05)', pointerEvents: 'none', zIndex: 0, userSelect: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textShadow: '0 0 50px rgba(239, 68, 68, 0.2)' }}>💀</div>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', zIndex: 1 }}>
            <h3 style={{ color: '#ef4444', textShadow: '0 0 20px #ef4444', marginBottom: 10, fontSize: '2rem' }}>SISTEMA COMPROMETIDO</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Has recibido demasiado daño.</p>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', marginBottom: 30 }}>Nivel alcanzado: {level}</div>
            <button className="btn-glow btn-glow-solid" onClick={resetGame} style={{ borderColor: '#ef4444', color: '#fff' }}>REINICIAR SISTEMA</button>
          </div>
        </div>
      )}

      {gameState === 'PAUSED' && (
        <div className="game-overlay">
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            <h3 style={{ color: 'var(--accent-violet)', marginBottom: 30 }}>SISTEMA PAUSADO</h3>
            <button className="btn-glow btn-glow-solid mb-3 d-block mx-auto" onClick={requestLockAndPlay}>REANUDAR</button>
          </div>
        </div>
      )}

      {gameState === 'UPGRADE' && (
        <div className="game-overlay" style={{ background: 'rgba(5, 10, 15, 0.85)', backdropFilter: 'blur(8px)' }}>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', width: '100%', padding: '0 20px' }}>
            <h3 style={{ color: 'var(--accent-cyan)', textShadow: '0 0 10px var(--accent-cyan)', marginBottom: 10 }}>SISTEMA ACTUALIZADO</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Selecciona un módulo de mejora para continuar:</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {upgradeCards.map((card) => (
                <div key={card.id} onClick={() => selectUpgrade(card.id)} style={{ width: 140, padding: '20px 15px', background: 'var(--bg-card)', border: `1px solid ${card.color}`, borderRadius: '12px', cursor: 'pointer', boxShadow: `0 0 15px ${card.color}20`, transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ color: card.color, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: 10 }}>{card.title}</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', lineHeight: 1.4 }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', zIndex: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem', pointerEvents: 'none', opacity: 0.5 }}>
          MOUSE: Mover & {level > 10 ? 'Auto-Fire' : 'Clic'} | ESC: Pausar
        </div>
      )}

      <style>{`.game-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; z-index: 20; background: rgba(5, 10, 15, 0.6); backdrop-filter: blur(4px); border-radius: 20px; }`}</style>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <GameLogic key={gameId} gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} level={level} setLevel={setLevel} playerStats={playerStats} setPlayerStats={setPlayerStats} onLevelUp={handleLevelUp} onGameOver={handleGameOver} />
      </Canvas>
    </div>
  );
}
