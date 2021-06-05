// Add your code here
namespace felix_enemy {

    class NormalEnemy extends ext_war.enemy.BaseEnemy implements ext_war.enemy.Enemy{

        constructor() {
            super()
            this.sprite = sprites.create(img`
                . . . . . . . . . . . .
                . . . f f f f f f . . .
                . . f e e e e e f f f .
                . f e e e e e e e f f f
                f e e e e e e e f f f f
                f e e 4 e e e f f f f f
                f e e 4 4 e e e f f f f
                f f e 4 4 4 4 4 f f f f
                . f e 4 4 f f 4 e 4 f f
                . . f d d d d 4 d 4 f .
                . . f b b d e e f f f .
                . . f e 4 e d d 4 f . .
                . . f 1 1 e d d e f . .
                . f f 6 6 f e e f f f .
                . f f f f f f f f f f .
                . . f f f . . . f f . .
            `,SpriteKind.Enemy)
            this.active = true
        }

        attack() : void {
            ext_war.enemy.createEnemyProjectile(img`
                2 2
                2 2
            `, this.sprite, 10, -50, 0)
        }
            
        superAttack() :void {
            ext_war.enemy.createEnemyProjectile(img`
                2 2
                2 2
            `, this.sprite, 10, -80, -60)
            ext_war.enemy.createEnemyProjectile(img`
                2 2
                2 2
            `, this.sprite, 10, -80, 0)
            ext_war.enemy.createEnemyProjectile(img`
                2 2
                2 2
            `, this.sprite, 10, -80, 60)
        }

        takeDamage(damage:number) :boolean {
            return true
        }

        move() {
            if (this.x < 32) {
                this.vx = 50
            } else if (this.x > 144) {
                this.vx = -50
            }

            if (this.y < 16) {
                this.vy = 50
            } else if (this.y > 104) {
                this.vy = -50
            }
        }

        destroy() : void {
            this.sprite.destroy()
            this.active = false
        }
    }
    
    ext_war.enemy.registerEnemyPrototype(function() {
        return new NormalEnemy()
    })

}
