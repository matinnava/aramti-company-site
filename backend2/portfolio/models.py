from django.db import models


class PortfolioItem(models.Model):
    CATEGORY_CHOICES = [
        ('website', 'سایت'),
        ('mobile', 'اپلیکیشن'),
        ('ai', 'هوش مصنوعی'),
        ('bot', 'بات'),
        ('automation', 'اتوماسیون'),
    ]

    title = models.CharField(max_length=200, verbose_name='عنوان')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name='دسته‌بندی')
    description = models.TextField(verbose_name='توضیحات')
    image = models.ImageField(upload_to='portfolio/', verbose_name='تصویر')
    technologies = models.JSONField(default=list, verbose_name='تکنولوژی‌ها')
    live_url = models.URLField(blank=True, verbose_name='لینک زنده')
    is_featured = models.BooleanField(default=False, verbose_name='ویژه')
    order = models.IntegerField(default=0, verbose_name='ترتیب')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'نمونه کار'
        verbose_name_plural = 'نمونه کارها'

    def __str__(self):
        return self.title