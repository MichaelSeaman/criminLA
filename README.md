# CriminLA
## Keeping YOU in the know about LA Crime

We strive to show our fellow LA goers their safety at their current or possible position. Whether you are traveling to LA for the first time or you have a child who likes to roam around, we want to make sure YOU know the dangerous areas to stay away from.

=======
# Who?
## OUR story
Succinctly put: We are three students from vastly different backgrounds with a common concern: SAFETY. By providing a platform for explorers and family alike, anyone could search for an area before they would walk past at night or purchase a property in, taking public safety statistics into concern. That is made easy with the data visualization and analysis CriminLA provides.

=======
# Why?
## Awareness -- the best defense
At CriminLA, we strive to provide clear data visualization with an intuitive UI so a city's (LA, for now) criminal statistics is readily available to the general public. This goes hand-in-hand with our data analysis specifically highlighting the type of crime to look out for and the most dangerous time of day at any given local area.

## The money shot: Our vision on why THIS is important
With daily updates, readers can keep current on local crime and compare crime levels across more than 200 neighborhoods and localities. When violent or property crimes rise sharply in LAPD patrolled neighborhoods, the system delivers a crime alert. Long-term statistics, like the rankings to the left, are available for areas covered by LAPD and the sheriff.
This simple web app is scalable to expand beyond just LA, making our ultimate goal of making CriminLA available to the most audience that much closer.

## What is public safety
Public safety is seen by some as the most important role of local government. In the County, this includes providing sheriff and fire services to all the unincorporated areas and many of the cities; protecting beachgoers; rescuing stranded and lost hikers, traffic accident victims, persons who have fallen into flood control channels; treating medical emergencies; and prosecuting, defending and sentencing those charged with crimes.

=======
# How?
## Starting point: Public dataset of arrests made in the City of Los Angeles
The City of Los Angeles generously provided the public with many extensive datasets to work with, and we were determined to make use of the dataset "Arrests Made in the City of Los Angeles" to address our's and most of everyone else's concern that is SAFETY. Our way of doing that is by visualizing the frequency of arrests made using a heatmap, and accompany that with local statics with metrics showing which type of crime and time of day to specifically look out for.

## Dataset to database
An API were available for the aforementioned dataset, and we were successful in requesting the data and storing it in our own MySQL database hosted on Amazon Web Services.

## Google Maps API
We are using Google Maps API to show the basic restricted and stylized map on the index.html page. The restriction is only in place as we only have data for LA (for the time being). The search should work for any address in the US (and worldwide eventually) despite the lack of data.

## Heatmap
There is an overlay object within the Google Maps API that we could use to express a heatmap. The heatmap is populated by the exact locations of arrests made during the last year.

## Bootstrapper
The main site is organized and built with modern web design philosophies in mind on Bootstrapper.

## Chart.js
Our graphs above the map that are meant to show the local analytics are wrapped into elements with Chart.js, a data visualization library.

=======
Contributors: Isa(B)ella Pepke, (A)ngus Yip, (M)ichael Seaman
