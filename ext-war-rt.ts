 namespace ext_war_engine {

    const ENEMIES:ext_war.enemy.Enemy[] = []
 
    // Engine code 
    // 
    // 1. life cycle (enemy spawning, levels, phrases)
    // 2. collision event handling
    // 3. 
    // scene.setBackgroundColor(9)
    let playerSprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . 2 4 2 2 2 2 2 2 c 2 . . .
        . . 2 c 4 2 2 2 2 2 2 c c 2 . .
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d
        . 2 c 2 e e e e e e e b c 4 2 2
        . 2 2 e b b e b b b e e b 4 2 2
        . 2 e b b b e b b b b e 2 2 2 2
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2
        . e e e e e e f e e e f e 2 d d
        . e e e e e e f e e f e e e 2 d
        . e e e e e e f f f e e e e e e
        . e f f f f e e e e f f f e e e
        . . f f f f f e e f f f f f e .
        . . . f f f . . . . f f f f . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
    controller.moveSprite(playerSprite, 80, 80)

    let playerHpBar = statusbars.create(20, 4, StatusBarKind.Health)
    playerHpBar.max = 100
    playerHpBar.value = 100
    playerHpBar.attachToSprite(playerSprite)

    sprites.onOverlap(SpriteKind.Player, 
        SpriteKind.EXT_WAR_ENEMY_PROJECTILE, 
        function(sprite: Sprite, otherSprite: Sprite) {
            let dmg = sprites.readDataNumber(otherSprite, "ap")
            playerHpBar.value -= dmg
            sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
            control.runInParallel(() => {
                pause(1000)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            })
    })


    sprites.onOverlap(SpriteKind.EXT_WAR_PLAYER_PROJECTILE, SpriteKind.Enemy, 
        function(sprite: Sprite, otherSprite: Sprite) {
            let overlappingEnemy = null;
            for (let enemy of ENEMIES) {
                if (enemy.getSprite() == otherSprite) {
                    overlappingEnemy = enemy
                    break
                }
            }

            if (overlappingEnemy != null) {
                let deadAfterDamageTaken = overlappingEnemy.takeDamage(sprites.readDataNumber(sprite, "ap"))
                if (deadAfterDamageTaken) {
                    overlappingEnemy.destroy()
                    ENEMIES.removeElement(overlappingEnemy)
                }
            }
    })

    statusbars.onZero(StatusBarKind.Health, function(status: StatusBarSprite) {
        game.over(false)
    })

    game.onUpdateInterval(1000, function() {    
        control.runInParallel(function() {
            let newSpawnEnemy = Math.pickRandom(ext_war.enemy.ENEMY_GENERATORS)()
            newSpawnEnemy.x = 144
            newSpawnEnemy.y = randint(10, 110)
            newSpawnEnemy.vx = randint(-50, 50)
            newSpawnEnemy.vy = randint(-50, 50)
            ENEMIES.push(newSpawnEnemy)
        })
    })  
}