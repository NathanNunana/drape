# Generated by Django 5.0.7 on 2024-08-11 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drape_app', '0002_alter_aboutus_file_alter_analytics_file_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='services',
            field=models.CharField(choices=[('Diagnostic Test', 'Diagnostic Test'), ('Engine Servicing', 'Engine Servicing'), ('Tires Replacement', 'Tires Replacement'), ('Oil Changing', 'Oil Changing')], max_length=50),
        ),
    ]
