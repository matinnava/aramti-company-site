from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_order, name='create_order'),
    path('<str:tracking_code>/', views.get_order_status, name='order_status'),
]