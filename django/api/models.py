from django.db import models

'''Sport class'''
class Sport(models.Model):
    sportId = models.AutoField(primary_key=True)
    sportName = models.CharField(max_length=100)


'''Championship class'''
class Championship(models.Model):
    championshipId = models.AutoField(primary_key=True)
    championshipName = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, related_name='sport', on_delete=models.CASCADE)


'''Team class'''
class Team(models.Model):
    teamId = models.AutoField(primary_key=True)
    teamName = models.CharField(max_length=100)
    teamAbbreviation = models.CharField(max_length=30)
    championship = models.ForeignKey(Championship, related_name='championship', on_delete=models.CASCADE)


'''Player class'''
class Player(models.Model):
    playerId = models.AutoField(primary_key=True)
    playerName = models.CharField(max_length=100)
    team = models.ForeignKey(Team, related_name='team', on_delete=models.CASCADE)
    cost = models.IntegerField()
    role = models.CharField(max_length=50)
    age = models.IntegerField()
    matchPlayed = models.IntegerField()


'''FootballPlayer class'''
class FootballPlayer(models.Model):
    footballPlayerid = models.AutoField(primary_key=True)
    player = models.ForeignKey(Player, related_name='%(class)s_player', on_delete=models.CASCADE)
    goal = models.IntegerField()
    assist = models.IntegerField()
    yellowCard = models.IntegerField()
    redCard = models.IntegerField()
    scoreAverage = models.FloatField()
    fantaScoreAverage = models.FloatField()


'''VolleyballPlayer class'''
class VolleyballPlayer(models.Model):
    volleyballPlayerid = models.AutoField(primary_key=True)
    player = models.ForeignKey(Player, related_name='%(class)s_player', on_delete=models.CASCADE)
    block = models.IntegerField()
    attackPoint = models.IntegerField()
    forearmPass = models.IntegerField()
    score = models.IntegerField()
