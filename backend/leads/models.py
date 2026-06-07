from django.db import models

class Lead(models.Model):
    STATUS_CHOICES = (
        ('NEW', 'New'),
        ('CONTACTED', 'Contacted'),
        ('QUALIFIED', 'Qualified'),
        ('LOST', 'Lost'),
    )
    name=models.CharField(max_length=100)
    email=models.EmailField()
    company=models.CharField(max_length=100)
    status=models.CharField(max_length=20,choices=STATUS_CHOICES,default='NEW')
    notes = models.TextField(blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name    
        
    
 