from django.db import models
from django.contrib.auth.models import User
from leads.models import Lead

class AuditLog(models.Model):
    ACTION_CHOICES = (
        ('CREATE', 'Create'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
        ('RESTORE','Restore')
    )


    lead = models.ForeignKey(Lead,on_delete=models.CASCADE,related_name='audit_logs')

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    old_data = models.JSONField(null=True, blank=True)
    new_data = models.JSONField(null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} - {self.lead.name}"