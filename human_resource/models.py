from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager ,AbstractUser
from django.core.files.storage import FileSystemStorage
# from django.utils.translation import ugettext_lazy as _

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(('email address'),     max_length=254,unique=True)
    avatar = models.ImageField(upload_to='media', blank=True)
    first_name = models.CharField(max_length=500 ,blank=True,null=True)
    last_name=models.CharField(max_length=500, blank=True,null=True)
    class Meta(AbstractUser.Meta):
       swappable = 'AUTH_USER_MODEL'
    def serialize(self):
        return({'name':self.username, 'id':self.id, 'email':self.email,
                 'avatar':self.avatar.url if self.avatar else None,
                 'first_name':self.first_name,
                 'last_name':self.last_name,})
        
# files = FileSystemStorage(location="/human_resource/image")
# # class Manager(AbstractUser):
# #     pass
class Img(models.Model):
    user=models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    photo=models.ImageField(upload_to='media',blank=True,null=True)
    def serialize(self):
        return{'user':self.user.username, 'photo':self.photo.url if self.photo else None}

class Applicant_form(models.Model):
    # photo=models.OneToOneField(Img,null=True,on_delete=models.CASCADE)
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    firstname =models.CharField(max_length=255)
    secondname =models.CharField(max_length=255)
    lastname=models.CharField(max_length=255,null=True,blank=True)
    department =models.CharField(max_length=50,null=True, blank=True)
    job_title=models.CharField(max_length=400,null=True, blank=True)
    date_hired=models.DateField(null=True, blank=True)
    experience=models.CharField(max_length=600,null=True, blank=True)
    salary=models.CharField(max_length=400,null=True, blank=True)
    # document=models.FileField(upload_to='media',blank=True)
    profile_picture=models.ImageField(upload_to='media',blank=True)
    def serializer(self):
        return {'name':self.firstname,
                 'firstname':self.user.first_name,
                 'lastname':self.user.last_name,
                 'secondname':self.secondname,
                 'lastname':self.lastname,
                  'department':self.department,
                   'job_title':self.job_title,
                    'date_hired':self.date_hired,
                     'experience':self.experience,
                      'salay':self.salary,
                       'user_id':self.user.id,
                        # 'user_stat':f'{list(self.user.user_stat_set.all())}',
                    #    'photo':self.profile_picture.url if self.profile_picture else None,
                    #     'document':self.document.url if self.document else None,
                         'profile_picture':self.profile_picture.url if self.profile_picture else None}
    
     

   

class User_stat (models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    hour=models.IntegerField(null=True, blank=True,default=0)
    date=models.DateTimeField(auto_now=True,null=True, blank=True)
    rate=models.IntegerField(null=True, blank=True, default=15)
    reason=models.CharField( max_length=1000,  null=True, blank=True)
    leave_date=models.IntegerField(null=True,blank=True)
    is_onleave=models.BooleanField(null=True, blank=True,default=False)
    is_onwork=models.BooleanField(null=True, blank=True,default=False)

    def serialize(self):
        return { 'user': self.user.username,
                 'hour': self.hour,
                 'date': self.date.strftime('%d %b %Y %H:%M:%S'),
                 'y_axis': self.rate*self.hour if self.rate and self.hour is not None else 0,
                 'reason':self.reason,
                 'leave_date': self.leave_date,
                 'id': self.id,
                 'onleave': self.is_onleave,'onwork': self.is_onwork}
   
class wage_rate (models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    rate=models.IntegerField(null=False,blank=False, default=20)
    last_updated=models.DateTimeField(auto_now=True,null=True, blank=True)
 
    def serialize(self):
       return{'user':self.user.username,'rate':self.rate,'last_updated':self.last_updated}

class Message(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    message=models.CharField(max_length=300, default='trial')
    sender_id=models.IntegerField()
    msg_time=models.DateTimeField(auto_now_add=True)
    profile_picture=models.ForeignKey(Applicant_form,models.CASCADE, null=True,blank=True)
    def key_value(self):
        return{'reciever':self.user.username,
                'msg':self.message, 'sende_id':self.sender_id,
                'picture':self.profile_picture.profile_picture.url if self.profile_picture.profile_picture else None,
                  'time':self.msg_time.strftime("%Y %m %d %H:%M")}
 

class Edit(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)  
    is_allowed=models.BooleanField(default=False)
    def serialize(self):
        return{'user':self.user.username, 'status':self.is_allowed}
