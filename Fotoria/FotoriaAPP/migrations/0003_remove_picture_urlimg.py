# Generated by Django 5.1.3 on 2025-02-06 03:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('FotoriaAPP', '0002_picture_img'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='picture',
            name='urlimg',
        ),
    ]
