from django.db import migrations

def createChampionshipDataTest(apps, schema_editor):

    Championship = apps.get_model('api','Championship')

    Championship(1,'Serie A', 1).save()
    Championship(2,'Premier League', 1).save()
    Championship(3,'Serie A Female', 2).save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_sport_data_test'),
    ]

    operations = [
        migrations.RunPython(createChampionshipDataTest)
    ]
