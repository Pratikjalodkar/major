from django.contrib import admin
from .models import *


admin.site.register(User)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'vendor', 'price', 'category',
                    'created_at') 
    search_fields = ('title', 'vendor__name')
    list_filter = ('category', 'created_at')

