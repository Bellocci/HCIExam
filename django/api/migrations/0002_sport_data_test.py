from django.db import migrations

def createSportDataTest(apps, schema_editor):

    Sport = apps.get_model('api','Sport')

    Sport(1,'Football').save()
    Sport(2,'Volleyball').save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(createSportDataTest)
    ]
