from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['tracking_code', 'full_name', 'phone', 'service_type', 'status', 'created_at']
    list_filter = ['status', 'service_type', 'created_at']
    search_fields = ['full_name', 'phone', 'tracking_code']
    list_editable = ['status']
    readonly_fields = ['tracking_code', 'created_at', 'updated_at']
    fieldsets = (
        ('اطلاعات سفارش', {
            'fields': ('tracking_code', 'service_type', 'sub_type', 'features', 'budget_range', 'deadline', 'description', 'attachment')
        }),
        ('اطلاعات مشتری', {
            'fields': ('full_name', 'phone', 'email', 'company', 'referral')
        }),
        ('وضعیت', {
            'fields': ('status', 'admin_notes')
        }),
        ('تاریخ', {
            'fields': ('created_at', 'updated_at')
        }),
    )