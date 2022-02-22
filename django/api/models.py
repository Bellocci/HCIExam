from django.db import models

'''Sport class'''
class Sport(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


'''Championship class'''
class Championship(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    sport = models.CharField(max_length=100)


'''Team class'''
class Team(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    championship = models.CharField(max_length=100)


'''Player class'''
class Player(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    cost = models.IntegerField()
    role = models.CharField(max_length=50)
    age = models.IntegerField()
    scoreAverage = models.FloatField()
    fantaScoreAverage = models.FloatField()
    matchPlayed = models.IntegerField()


'''FootballPlayer class'''
class FootballPlayer(models.Model):
    id = models.AutoField(primary_key=True)
    playerName = models.CharField(max_length=100)
    goal = models.IntegerField()
    assist = models.IntegerField()
    yellowCard = models.IntegerField()
    redCard = models.IntegerField()


'''VolleyballPlayer class'''
class VolleyballPlayer(models.Model):
    id = models.AutoField(primary_key=True)
    playerName = models.CharField(max_length=100)
    block = models.IntegerField()
    attackPoint = models.IntegerField()
    forearmPass = models.IntegerField()

