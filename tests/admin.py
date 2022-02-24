from django.contrib import admin
from tests.models import *

# Register your models here.
admin.site.register(Test)
admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(UserAnswer)
admin.site.register(Session)