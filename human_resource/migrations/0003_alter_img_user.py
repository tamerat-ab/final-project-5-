# Generated by Django 4.2.4 on 2023-11-10 16:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('human_resource', '0002_alter_img_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='img',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
