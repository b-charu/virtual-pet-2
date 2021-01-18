class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.LastFeed;
        this.image = loadImage("Milk.png");
    }
    updateFoodStock(food1)
    {
        this.foodStock = food1;
    }
    getFeedTime(lfeed)
    {
        this.lastFeed = lfeed;
    }
    deductFood()
    {
        this.foodStock = this.foodStock-1;
    }
    getFoodStock()
    {
    return this.foodStock;
    }
    display()
    {
        var x=80,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock!=0)
        {
            for(var i=0;i<this.foodStock;i++)
            {
                if(i%10==0)
                {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
            }
        }
    }
}