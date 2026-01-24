from django.contrib import admin
from .models import Product, Category

# admin.site.register(Product)
# admin.site.register(Category)
# 1. Configuration pour les Catégories
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    # MAGIE : Le slug se remplit tout seul quand tu tapes le nom ! 
    prepopulated_fields = {'slug': ('name',)}

# 2. Configuration pour les Produits
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # On affiche la colonne 'category' pour voir où est rangé chaque produit
    list_display = ('name', 'category', 'price', 'stock')
    list_filter = ('category',) # Ajoute un filtre latéral par catégorie

