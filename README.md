#Summary
This data visualization presents the weight, height and BMI of every Major League baseball player for whom Sean Lahman’s database contains height and weight records.   Player height and BMI are presented on the x and y axes respectively, and player weight is represented by the size of the player’s marker. Each player is plotted in their debut year from 1871 to 2015, and the average height, weight, and BMI for that year are plotted in red.  Viewers can see the historic average trends in height and BMI and then navigate to a specific year to get information about the players that debuted in that year.
#Design

##The message for the design
I began designing by examining the data regarding player’s weight and height, when I noticed that both height and weight of players continually increased since the start of Major League Baseball.  However, at about the 1990s, the weight started to increase more than the average increase in height.  I sketched a plot in R to measure the change in BMI over time, and this can be found in the project history folder.  It showed a dramatic increase in weight, but not height since the 1990s.  I wanted to capture this story, but I needed to be able to show: passage of time; weight; height; and BMI.  Since the story was about the BMI, I initially chose to put this on the x axis, with the height on the y axis.  I chose to show the passage of time by animation, and the weight by the size of the dot representing each player.

Even though the animation was occurring over time, I wanted the user to have a way to see how the averaged had changed, so I decided to make the individual play data change over time to give the viewer an idea of the spread of the data, while having the average data persist. 
Finally, I wanted to keep the overall idea of the Martini Glass design with the website, in the sense that I would tell a story, and then have the user be able to explore after I was done telling my story, so that the user could develop their own story.  Therefore, I wanted to user to be able to navigate in time and examine the individual players after the animation was completed.

##Overall design considerations

#Feedback

###What do you notice in the visualization?

It moved a little fast for me, but the end result was a horribly twisted phallic shape.

The height and weight rose together over the years and the BMI was relatively constant.

Baseball players are getting taller and their BMI is going up.  They were just getting taller until about 1980, and then the BMI started to increase.  The cluster around the average seemed more or less of a consistent size and distribution around the average.

I think it does a good job of building the core (red dots) while showing the changing average.  However, I don't think I noticed that nearly as clearly until after the final graphic that shows the shape of the red curve without the grey.  Ones I saw that that last slide for the first time, the changes made much more sense in subsequent views.

Baseball players have gotten bigger in recent years.

###What questions do you have about the data?

"I understand that this sportsball is a game where some people have to run (outfielders, batters), but some don't, or not as much (catchers, first base defenders). Slow it down and maybe break it down by position played? I know that's asking for a lot of work."

What was the red dot versus the grey dot? I didn't understand from the key.

All MLB?  Subset of MLB?  Other groups included?  What is the source?  Cards tend to list players as taller than they actually are...I think.  Not sure what each dot represents.

The graphic itself sands alone pretty well.  I'd need to know more about what brought me to it and why I might care. 

Why are they taller and heavier? Are baseball coaches recruiting heavier players, or are people, in general, also taller and fatter? Is there a correlation between baseball players change in size and their RBIs (or other baseball related indicators)?

###What relationships do you notice?
There are a lot of "bigger" weight sportsball players.

Height and Weight rose together.

See question 1

It's not clear to me when I first look at the graphic that the small line at the bottom is the scale that I should be paying attention to.  I think it needs to be emphasized more for the bubbles to mean much.

As height increases, so does BMI.


###What do you think is the main takeaway from this visualization?

Steroids make you gain weight. It's up to you if you spend that time in a gym or on the couch.

There seems to be a BMI that is best for players.

Baseball players are getting taller and heavier, and BMI is also increasing.

Baseball players are getting bigger over the years.

###Is there something you don’t understand in the graphic?
Slower. I'm almost 43. Don't expect everyone to be able to grasp the information in the speed that you present it.

The definition of the dots.

Does each gray dot represent a 200lb player?

I'm not sure how they grey circles indicate all baseball players for that year. Is this just a small sample from a team? I can see their names when I scroll over a circle.


###What do you think could be done to make the graphic clearer?

See above. Maybe more colors to differentiate between the weights?

Dot definition.

The axes are really long, and extend far beyond the min/max values of the data, maybe try shortening them?

The labels look pretty washed out and don't draw my attention when I first look at it.  The design is modern and attractive, but many of these muted tones make it harder for me to focus.

Maybe state what (or who) the grey circles represent

###What story does this data visualization tell you, if any?

That this particular sportsball used to be dominated by men who were of average strength and weight and now slants towards those who can run fast and those who can hit the home runs.

That while the players BMI stayed in a range, that someone from the 1870's would not be competitive size-wise today.

Baseball players are getting taller and heavier, and BMI is also increasing.

On average, baseball players are getting bigger--maybe fatter--but more likely more muscular either from drugs or weight training.

Baseball players have gotten taller and fatter.

###What other features might make the data visualization easier to understand?
"Breakdown by position, which I've said before.
Otherwise, it's a good presentation."

A paragraph introduction. Despite having labeled axes the point could still be spelled out.

Number of players per year(s) measured, maybe?

I like it.

Just an explanation for what the grey circles designate.

###Feedback Uncategorized

Good job！Very talent visualization.
If I were you, I would do below:
1) x axis between 60 inches and 85 inches is enough, and I will let the circle travel from left side of the chart to the right, and move the text to the top or other place, let whole "svg element" represent the scatter point.
2) I got the opinion from peter_58389999326509:
"I also think its nice to make possible interactions obvious to the viewer: you can apply styles such as "cursor:pointer" to your clickable divs so the cursor changes when users hover over these elements"
3) I don't think "fix" the above "div button" is a good choice (which we were taught in the lesson), the button should flow the "svg element" when I move the middle mouse button. I use "position:relative;" in my work.
Hope it help.



#Resources
list any sources you consulted to create your visualization