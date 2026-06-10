from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PortfolioItem
from .serializers import PortfolioItemSerializer


@api_view(['GET'])
def get_portfolio(request):
    category = request.query_params.get('category', None)
    if category:
        items = PortfolioItem.objects.filter(category=category)
    else:
        items = PortfolioItem.objects.all()
    serializer = PortfolioItemSerializer(items, many=True, context={'request': request})
    return Response(serializer.data)