# Generated by Django 2.0 on 2019-01-01 14:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('annotations', '0005_auto_20190101_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='target',
            name='selector',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='target', to='annotations.Selector'),
        ),
    ]
