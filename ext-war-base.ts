// Add your code here
namespace ext_war.enemy {

    export const ENEMY_GENERATORS:(()=>Enemy)[] = []

    export interface Enemy {

        getSprite():Sprite

        attack() : void
        superAttack() :void

        move() : void

        destroy() : void

        x:number
        y:number

        vx:number
        vy:number

        // Enemy takes %damage, returns true if destroyed after damage taken, otherwise return false
        takeDamage(damage : number): boolean
    }


    //%blockid=extwarcore_createenemyprojectile %block="create enemy projectile %img=imagepicker from %firingSprite with %attackPower=1 | %vx=0 vy=0"
    export function createEnemyProjectile(image:Image, firingSprite:Sprite, 
                                            attackPower:number, vx :number, vy : number) :Sprite{
        let projectile = sprites.createProjectileFromSprite(image, firingSprite, vx, vy)
        projectile.setKind(SpriteKind.EXT_WAR_ENEMY_PROJECTILE)
        sprites.setDataNumber(projectile, "ap", attackPower)
        return projectile
    }
    
    export abstract class BaseEnemy {

        protected active:boolean
        protected sprite:Sprite

        get x() :number{
            return this.sprite.x 
        }

        get y() :number{
            return this.sprite.y
        }

        set x(x:number) {
            this.sprite.x = x
        }
        set y(y:number) {
            this.sprite.y = y
        }

        get vx() :number{
            return this.sprite.vx 
        }

        get vy() :number{
            return this.sprite.vy
        }

        set vx(vx:number) {
            this.sprite.vx = vx
        }
        set vy(vy:number) {
            this.sprite.vy = vy
        }

        getSprite():Sprite {
            return this.sprite
        }

        constructor(){
            
        }

    }

    //%block
    //%blockid=dddd ""
    export function registerEnemyPrototype(cb:()=>Enemy) {
        ENEMY_GENERATORS.push(cb)
    }

}

namespace SpriteKind {

    export const EXT_WAR_PLAYER_PROJECTILE = SpriteKind.create()
    export const EXT_WAR_ENEMY_PROJECTILE = SpriteKind.create()

    export const EXT_WAR_ENEMY = SpriteKind.create()


    
}