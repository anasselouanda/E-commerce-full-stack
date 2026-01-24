from django.db import models

# Create your models here.


class Category(models.Model):
    """Model of category"""
    name = models.CharField(max_length=100)
    # Le slug sert à l'URL (ex: /montres-luxe)
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)
    def __str__(self):
        return self.name

class Product(models.Model):
    """"Database model for product"""
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE, # Si on supprime la catégorie, le produit disparaît 
        null=True
    )
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='produits/%Y/%m/', null=True, blank=True)
    stock = models.IntegerField(default=0)
    

    def get_full_name(self):
        """Retrieve full name of product"""
        return self.name
    
    def get_full_description(self):
        """Retrieve full description of product"""
        return self.description
    
    def get_full_price(self):
        """Retrieve full price of product"""
        return self.price
    
    def __str__(self):
        """Return string representation of our product"""
        return self.name