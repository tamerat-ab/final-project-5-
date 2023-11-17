from django.forms import ModelForm, TextInput, EmailInput,NumberInput,PasswordInput
from .models import Img

class ImageForm(ModelForm):
      
    class Meta:
        model=Img
        fields= ['photo']
        # ['user',  'firstname', 'secondname', 'lastname', 'department',  'job_title', 'date_hired', 'experience', 'salary', 'document',
      

        # widgets = {
        #     'photo': TextInput(attrs={
        #         'class': "form-photo",
        #         'style': 'max-width: 300px;',
        #          'placeholder': 'Name'
        #         }),}

        #     'email': EmailInput(attrs={
        #         'class': "form-control", 
        #         'style': 'max-width: 300px;',
        #         'placeholder': 'Email'
        #         })
        # }
# class Update(ModelForm):
#     class Meta:
#         model=Applicant_form
#         fields=['profile_picture']