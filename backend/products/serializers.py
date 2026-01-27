from rest_framework import serializers
from .models import Product, Category


# 1. Traducteur pour la Catégorie
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

# 2. Traducteur pour le Produit
class ProductSerializer(serializers.ModelSerializer):
    # Ça dit : "Pour le champ category, utilise la méthode __str__ du modèle (le nom)"
    category = serializers.StringRelatedField()
    class Meta:
        model = Product
        fields = '__all__' # On traduit TOUS les champs (id, name, price, image...)