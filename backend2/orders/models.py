from django.db import models
import random
import string


class Order(models.Model):
    SERVICE_CHOICES = [
        ('website', 'طراحی سایت'),
        ('mobile', 'اپلیکیشن موبایل'),
        ('ai', 'هوش مصنوعی'),
        ('automation', 'اتوماسیون و بات'),
        ('network', 'شبکه و امنیت'),
        ('backend', 'بک‌اند و API'),
        ('other', 'سایر'),
    ]
    STATUS_CHOICES = [
        ('new', 'جدید'),
        ('reviewing', 'در حال بررسی'),
        ('in_progress', 'در حال انجام'),
        ('delivered', 'تحویل داده شده'),
        ('cancelled', 'لغو شده'),
    ]

    tracking_code = models.CharField(max_length=10, unique=True, blank=True)
    service_type = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    sub_type = models.CharField(max_length=100, blank=True)
    features = models.JSONField(default=list)
    budget_range = models.CharField(max_length=100, blank=True, default='مشخص نشده')
    deadline = models.CharField(max_length=100, blank=True, default='نامشخص')
    description = models.TextField(blank=True)
    attachment = models.FileField(upload_to='orders/', blank=True, null=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    company = models.CharField(max_length=200, blank=True)
    referral = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'سفارش'
        verbose_name_plural = 'سفارشات'

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            self.tracking_code = 'AR' + ''.join(random.choices(string.digits, k=6))
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_code} - {self.full_name} - {self.get_service_type_display()}"