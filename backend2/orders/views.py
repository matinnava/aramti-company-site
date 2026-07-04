from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer


@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'سفارش شما با موفقیت ثبت شد',
            'tracking_code': serializer.instance.tracking_code,
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_order_status(request, tracking_code):
    try:
        order = Order.objects.get(tracking_code=tracking_code)
        return Response({
            'tracking_code': order.tracking_code,
            'service_type': order.get_service_type_display(),
            'status': order.get_status_display(),
            'created_at': order.created_at,
        })
    except Order.DoesNotExist:
        return Response({'error': 'سفارش یافت نشد'}, status=status.HTTP_404_NOT_FOUND)