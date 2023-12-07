

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from .models import User,Applicant_form, User_stat, Message,wage_rate,Img ,Edit

from django.core.exceptions import ObjectDoesNotExist
import json 
from .forms import ImageForm
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime,timedelta
from django.core.files.base import ContentFile
from django.core.serializers import serialize 
from django.core.serializers.json import DjangoJSONEncoder
from dateutil import parser #helps to parse string format date in datetime format
import pytz
utc=pytz.UTC #the above two modules modulate the datetime naive and datetime aware issues

# from PIL import Image
# from io import BytesIO
# import base64


def front_page(request):
    return render( request,'human_resource/front_page.html')
def user_register(request):
    if request.method=='POST':
        # data=json.loads(request.body)
        # username=data.get('user_reg')
        # password1=data.get('password_reg')
        # password2=data.get('confirm_reg')
        # email=data.get('email_reg')
        
        username=request.POST.get('username')
        password1=request.POST.get('password1')
        password2=request.POST.get('confirm')
        email=request.POST.get('email')
        first_name=request.POST.get('first_name')
        last_name=request.POST.get('last_name')

        if password1!=password2:
            return render(request,'human_resource/front_page.html',{'message':'the password entered should match'})
        else:
            try:
                
                    user=User.objects.create_user(email=email, username=username, password=password1,first_name=first_name,last_name=last_name)
                    user.save()
                    # return render(request,'human_resource/front_page.html',{'message':user})
            except IntegrityError:
                return render(request,'human_resource/front_page.html',{'message':'user already exists'})
        login(request,user)
        return HttpResponseRedirect(reverse("index"))
        # return HttpResponseRedirect(reverse("index"))
        

def user_login(request):
    if request.method == "POST":
       
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        
        user=authenticate(request, username=username, password=password)
        if (user is not None):
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
       
        elif user is not None:
            if user.is_superuser:
        
                login(request, user)
                return HttpResponseRedirect(reverse("admin_user"))

        else:
           return render(request,'human_resource/front_page.html',{'message':'Either Username of password is incorrect'})
    else:
        return render(request, "human_resource/front_page.html",{'message':'not logged in'})   
    
def user_logout(request):
    logout(request) 
    return HttpResponseRedirect(reverse("front_page"))

def index(request):
    # if request.method =='GET':
    all_users=User.objects.all()

    # return JsonResponse([user.serialize()for user in all_users], safe=False,status=200)
    return render(request, 'human_resource/index.html')

def application(request):
    user=request.user
    if Applicant_form.objects.filter(user=user).exists():
      return JsonResponse({'response':True})

@csrf_exempt
def applicant_form(request): 
    user=request.user
    if request.method=='GET':
        applicantForm=Applicant_form.objects.filter(user=user)
        return JsonResponse([applicant_form.serializer() for applicant_form in applicantForm],safe=False)

    if request.method == "POST":
        data=json.loads(request.body)
     
           
        firstname=data.get('firstname')
        secondname=data.get('secondname')
        lastname=data.get('lastname')
        department=data.get('department')
        age=data.get('department')
        hiredate=data.get('hiredate')
        #  sex=request.POST.get('sex')
        job=data.get('job')
        
        work=data.get('work')
        salary=data.get('salary')
        document=data.get('document')
        picture=data.get('picture')
        applicant_form=Applicant_form(                  user=user,
                                                        firstname=firstname, 
                                                        secondname=secondname,
                                                        lastname=lastname,
                                                        # age=age,
                                                        department=department,
                                                        job_title=job,
                                                        salary=salary,
                                                      
                                                        date_hired=hiredate,
                                                        experience=work,
                                                     
                                                        profile_picture=picture)
        applicant_form.save()
        return HttpResponseRedirect(reverse("index"))
    
    if request.method == 'UPDATE':  
        data=json.loads(request.body)
   
           
        firstname=data.get('firstname')
        secondname=data.get('secondname')
        lastname=data.get('lastname')
        department=data.get('department')
        age=data.get('department')
        hiredate=data.get('hiredate')
        #  sex=request.POST.get('sex')
        job=data.get('job')
        
        work=data.get('work')
        salary=data.get('salary')
        document=data.get('document')
        picture=data.get('picture')

        update=Applicant_form.objects.get(user=user)
        update.firstname=firstname
        update.secondname=lastname
        update.lastname=lastname
        update.department=department
        update.job_title=job
        update.salary=salary
        update.date_hired=hiredate
        update.experience=work
        update.profile_picture=picture
        update.save()
        isUpdate=Edit.objects.get(user=user)
        isUpdate.is_allowed=False
        isUpdate.save()
        newupdate=Applicant_form.objects.filter(user=user)

        return JsonResponse([applicant_form.serializer() for applicant_form in newupdate],safe=False)
       
       
   
    



def users_stat(request): 
    stats=User_stat.objects.all()
    return JsonResponse({'year':stats})

csrf_exempt
def new_picture(request):
    user=request.user 
    context={}
    if request.method == 'POST':
        if Img.objects.filter(user=user):
            form=ImageForm(request.POST,request.FILES)
            if form.is_valid():
                img=form.cleaned_data.get('photo')
                applicant=Applicant_form.objects.get(user=user)
               
                old=Img.objects.get(user=user)
                old.photo=img
                old.save()
                applicant.profile_picture=img
                applicant.save()
                # return JsonResponse({'photo':'updated'})
        else:
            form = ImageForm(request.POST,request.FILES)
            if form.is_valid():
                img=form.cleaned_data.get('photo')
                applicant=Applicant_form.objects.get(user=user)
                # img=form['photo']
                obj=Img(user=user,photo=img)
                obj.save()
                applicant.profile_picture=img
                applicant.save()
               
                # return JsonResponse({'photo':'UPLOADED'})
    else:
       
        form=ImageForm()
        mg=Img.objects.filter(user=user)
       
        return JsonResponse([img.serialize() for img in mg],safe=False)
    context['form']=form
    mg=Img.objects.filter(user=user)
    # print(mg)
    newOne=json.loads(serialize("json",mg))
   
    return render(request,'human_resource/index.html',context)
  

@csrf_exempt   
def message(request,rec_id):
    user=request.user
    msg_end=User.objects.get(id=rec_id)

    msg_user=Message.objects.filter(user=user, sender_id=rec_id)
    msg_user=[message.key_value() for message in msg_user]
    count1=len(msg_user)
    form=Applicant_form.objects.get(user=user)
    picture=form.profile_picture

    if request.method == 'POST':
        data=json.loads(request.body)
        message=data.get('message')
        # message=request.POST.get('message')
        date=request.POST.get('date') 
        msg=Message(user=msg_end,sender_id=user.id,message=message,msg_time=date, profile_picture=form)
        msg.save()
        msg_user=Message.objects.filter(user=user, sender_id=rec_id)
        msg_user=[message.key_value() for message in msg_user]
        count2= len(msg_user)
        real_count=count2-count1
        
     
        msg_sender=Message.objects.filter(user=msg_end, sender_id=user.id)
        msg_sender=[message.key_value() for message in msg_sender]
        sender=user.username
        reciever=msg_end.username
        # msg_set=Message.objects.filter(user_in=[user,sender_id] , sender_id=[user.id,sender_id] ).order_by('date')
        msgs=(msg_sender + msg_user)
        # newlist = sorted('list_to_be_sorted', key=lambda d: d['name'],reverse=True) /important
        newlist = sorted(msgs, key=lambda d: d['time']) 
      
        newlist_2=[]
      
        for i in newlist: 
            if i['reciever'] ==f'{sender}':
                
                m={'sender':i}
                newlist_2.append(m)
            else: 
                n={'reciever':i}
                newlist_2.append(n)
        newlist_2
       
        # return JsonResponse({'msgs':msgs})
        return JsonResponse({'msgs':newlist_2,'count':real_count})
        # return JsonResponse({'message':'sucess'}, safe=False)

    if request.method =='GET':
      
        msg_user=Message.objects.filter(user=user, sender_id=rec_id)
        msg_user=[message.key_value() for message in msg_user]
        count2= len(msg_user)
        real_count=count2-count1
        
     
        msg_sender=Message.objects.filter(user=msg_end, sender_id=user.id)
        msg_sender=[message.key_value() for message in msg_sender]
        sender=user.username
        reciever=msg_end.username
        # msg_set=Message.objects.filter(user_in=[user,sender_id] , sender_id=[user.id,sender_id] ).order_by('date')
        msgs=(msg_sender + msg_user)
        # newlist = sorted('list_to_be_sorted', key=lambda d: d['name'],reverse=True) /important
        newlist = sorted(msgs, key=lambda d: d['time']) 
      
        newlist_2=[]
      
        for i in newlist: 
            if i['reciever'] ==f'{sender}':
                
                m={'sender':i}
                newlist_2.append(m)
            else: 
                n={'reciever':i}
                newlist_2.append(n)
        newlist_2
       
        # return JsonResponse({'msgs':msgs})
        return JsonResponse({'msgs':newlist_2,'count':real_count})
@csrf_exempt
def stat(request,user_id):
    user=request.user
    users=User.objects.get(id=user_id)
    stat=User_stat.objects.filter(user=users)
 
    data_y=[]
    data_date=[]
    salary=[]
    hours=[]
    total_salary=0
    total_hours=0
    ser=[user_stat.serialize() for user_stat in stat]
    for i in range(len(ser)):
        val_y= ser[i]['y_axis']
        total_salary+=int(ser[i]['y_axis'])
        # salary.append(total_salary)
        total_hours+=int(ser[i]['hour'])
        # hours.append(total_hours)
        val_date=ser[i]['date']
        data_y.append(val_y)
        data_date.append(val_date)
    data_y
    data_date
    total_salary
    # hours=hours.append(total_hours)
    # salary=salary.append(total_salary)
    static=list(User_stat.objects.filter(user=users).order_by('-id')[:1])
    static=[user_stat.serialize() for user_stat in static]
    # statics=json.loads(serialize("json", static))
 
    wagerate=wage_rate.objects.filter(user=users)
    wage=[wage_rate.serialize() for wage_rate in wagerate]
   
    applicant=Applicant_form.objects.filter(user=users)
    applicant=[applicant_form.serializer() for applicant_form in applicant]
    user_img=Img.objects.filter(user=users)
    user_img=[img.serialize() for img in user_img]
   

    
    return JsonResponse({'date':data_date,'y_axis':data_y,'static':static,'salary':total_salary, 'hours':total_hours,'wage':wage,'applicant':applicant,'user_img':user_img})
    
@csrf_exempt
def is_onwork(request,user_id):
    year=datetime.now().year
    month=datetime.now().month
    day=datetime.now().day
    #    in case the user forgot to leave the javascript should count time and fetch the onleave data ------dont 
    time_begin = parser.parse(f'{year}-{month}-{day} 08:00:00').replace(tzinfo=utc)
            #    time_end = datetime.fromisoformat(f'{year}-{month}-{day} 17:30:00')
    time_end = parser.parse(f'{year}-{month}-{day} 17:30:00').replace(tzinfo=utc)

    user = request.user

    if request.method == 'GET':
        try:
          stat=User_stat.objects.filter(user=user).order_by('-id')[:1]
          return JsonResponse([user_stat.serialize() for user_stat in stat],safe=False)
        except:
            return JsonResponse({'response':'doesnt exist'})

    if request.method=='POST':
        rate=wage_rate.objects.get(user=user).rate
        data=json.loads(request.body)
        hour=data.get('hour')
        date=data.get('date')
        reason=data.get('reason')
        leave_date=data.get('leave_date')
        is_onleave=data.get('is_onleave')
        is_onwork=data.get('is_onwork')
        # rate=wage_rate.rate
        user_stat=User_stat(user=user,date=date,is_onleave=True, is_onwork=False,reason=reason,leave_date=leave_date,rate=int(rate))
        user_stat.save()
        update=User_stat.objects.all()
        return JsonResponse([user_stat.serialize() for user_stat in update],safe=False)
    
    if request.method =='UPDATE':
        user=request.user

        rate=wage_rate.objects.get(user=user).rate
        data=json.loads(request.body)
        hour=data.get('hour')
        date=data.get('date')
        reason=data.get('reason')
        leave_date=data.get('leave_date')
        is_onleave=data.get('is_onleave')
        is_onwork=data.get('is_onwork')

        stat=User_stat.objects.filter(user=user).order_by('-id').first()
       
        print(datetime.now().replace(tzinfo=utc))
        #    stat=[user_stat.serialize() for user_stat in stat_filter] 
        if stat:
            onleave=stat.is_onleave
            last_date=stat.date
            print(last_date.replace(tzinfo=utc))
            last_hour=stat.hour
            year=datetime.now().year
            month=datetime.now().month
            day=datetime.now().day
            #    time_begin = datetime.fromisoformat(f'{year}-{month}-{day} 08:00:00, '%Y-%m-%dT%H:%M:%S.%f') 
            time_begin = parser.parse(f'{year}-{month}-{day} 08:00:00').replace(tzinfo=utc)
            #    time_end = datetime.fromisoformat(f'{year}-{month}-{day} 17:30:00')
            time_end = parser.parse(f'{year}-{month}-{day} 17:30:00').replace(tzinfo=utc)
        
        

            if last_date and (time_begin < last_date < time_end) and ( onleave==False):
                        # if onleave==False and request.post.get('is_onleave')==True:

                            if (time_begin.replace(tzinfo=utc) < datetime.now().replace(tzinfo=utc) < time_end.replace(tzinfo=utc)):
                                if is_onwork==False and is_onleave==False:
                                    # if last_date.strftime('%d %b %y')==datetime.now().strftime('%d %b %y'):
                                
                                    # hr=int(datetime.now().strftime("%H:%M"))-int(last_date.strftime("%H:%M"))
                                    diff_hour=(datetime.now().replace(tzinfo=utc))-(last_date.replace(tzinfo=utc))
                                    # hr=str(diff_hour.strftime("%H:%M"))
                                    hr=str(diff_hour)
                                    hr=hr.split(':')
                                    totaltime=int(hr[0])+(int(hr[1])/60)
                                    print(f'lasthour:{totaltime} lastdatetime:{last_date} now:{datetime.now()}')
                                    hour=last_hour +totaltime
                                    # hour=totaltime
                                    # user_stat=User_stat( user=user,date=date,hour=hour,is_onleave=False,is_onwork=False,rate=rate)
                                    stat.hour=hour
                                    stat.is_onwork=False
                                    stat.date=datetime.now()
                                    stat.save()
                                    user_static=User_stat.objects.all()
                                    # return JsonResponse([user_stat.serialize() for user_stat in user_static],safe=False)
                                    return JsonResponse({'response':'on break'})
                                
                                elif is_onwork==True and  is_onleave==False:
                                    # stat.hour=0
                                    stat.is_onwork=True
                                    stat.date=datetime.now()
                                    stat.save()
                                    user_static=User_stat.objects.all()
                                    # return JsonResponse([user_stat.serialize() for user_stat in user_static],safe=False)
                                    return JsonResponse({"response":'back on  work from break'})
                                #    user_stat=User_stat(user=user,date=date,hour=0,is_onleave=False, is_onwork=True)
                            # else: # DOUBLE CHECK ON HERE AVOID REDUDUNCY 
                            #     # user_stat=User_stat(user=user,date=date,hour=0,is_onleave=False, is_onwork=True, rate=rate)
                            #     return JsonResponse({'response':'this is not working hour','workhour':False})
                          
            # elif (time_begin.replace(tzinfo=utc) < datetime.now().replace(tzinfo=utc) < time_end.replace(tzinfo=utc)) and (onleave==False )and ( last_date.replace(tzinfo=utc)>time_begin.replace(tzinfo=utc) and last_date.replace(tzinfo=utc)>time_end.replace(tzinfo=utc)):
            elif (time_begin.replace(tzinfo=utc) < datetime.now().replace(tzinfo=utc) < time_end.replace(tzinfo=utc)) and (onleave==False )and ( last_date.replace(tzinfo=utc)<time_begin.replace(tzinfo=utc) ):
                    user_stat=User_stat(user=user,date=datetime.now,hour=0,is_onleave=False, is_onwork=True, rate=rate)
                    # return JsonResponse({'response':user_stat})
                    return JsonResponse({'response':'welcome back'})
            elif (datetime.now().replace(tzinfo=utc) > time_end.replace(tzinfo=utc)) and (onleave==False ):
                return JsonResponse({'response':'this is not working hours'})
            else:
                 return JsonResponse({'response':'you are on leave'})
        elif (time_begin.replace(tzinfo=utc) < datetime.now().replace(tzinfo=utc) < time_end.replace(tzinfo=utc)):
            if is_onwork==True and is_onleave==False:
                work_start=User_stat(is_onwork=True,is_onleave=False,hour=0,rate=rate,user=user)
                work_start.save()
            return JsonResponse({'response':'you have started working'})
        # else:
        #     return JsonResponse({'response':'not working hour'})

   
   
    if request.method == 'DELETE':
        data=json.loads(request.body)
        id=data.get('id')
        leave=data.get('leave')
        # leave_delete=User_stat.objects.filter(user=user,id=id)
        leave_delete=User_stat.objects.filter(user=user).order_by('-id').first()
        # leave_delete.reason
        leave_delete.is_onleave=False
        # leave_delete.is_onwork=False
        leave_delete.save()
        
        return JsonResponse({'response':'you are on work now'})
@csrf_exempt
@login_required
def all_users(request):
    user=request.user
    form=Applicant_form.objects.all()
   
    return JsonResponse([applicant_form.serializer() for applicant_form in form], safe=False)
  

    # return JsonResponse([user.serialize()for user in all_users], safe=False,status=200)


@csrf_exempt
def admin_user(request):
    return render(request, 'human_resource/admin_user.html') 
    
@csrf_exempt
def set_rate(request):
    user=request.user
    if request.method=='GET':
        wage=wage_rate.objects.get(user=user)
        return JsonResponse({'wage':wage}, safe=False, status=200)
    if request.method == 'UPDATE':
        # new_rate=request.POST.get('rate')
        data=json.loads(request.body)
        newrate=data.get('rate')
        static=wage_rate.objects.all()  
       
        if static.exists():
            try:
                users=User.objects.all()
                for user in users:
                    stat=wage_rate.objects.get(user=user)             
                    stat.rate=newrate  
                    stat.save()      
               
                return JsonResponse({'update_rate':newrate})
            except:
                return JsonResponse({'response':'error with setting wage rate'})
        else:
            users=User.objects.all()
            # users=[user.serialize() for user in users]
            for user in users:
                set_rate=wage_rate(user=user,rate=newrate)
                set_rate.save()
                new_update=wage_rate.objects.all()
            return JsonResponse([wage_rate.serialize()for wage_rate in new_update])



def edit(request,id):
    user=request.user
    if request.method =='UPDATE':
        target_user=User.objects.get(id=id)
        if Edit.objects.filter(user=target_user).exists():
            data=json.loads(request.body)
           
            value=data.get('is_allowed')
            existing_status=Edit.objects.get(user=target_user)
            existing_status.is_allowed=value
            existing_status.save()
            new_status=Edit.objects.filter(user=target_user)
            status=existing_status.is_allowed
            return JsonResponse([edit.serialize() for edit in new_status],safe=False)
            # return JsonResponse({'status':status})
        else:
            posting_new_status=Edit(user=target_user, is_allowed=True)
            posting_new_status.save()
            new_posting=Edit.objects.filter(user=target_user)
           
            return JsonResponse([edit.serialize() for edit in new_posting],safe=False)
    if request.method == 'GET':
        user_edit_status=Edit.objects.filter(user=user)
      
        if user_edit_status:
            return JsonResponse([edit.serialize() for edit in user_edit_status], safe=False)
        else:
            return JsonResponse({'response':'none status'})




# def form(request):
    # user=request.user
    # form=Applicant_form.objects.all()
    # appplicants=[]
    # # users=User.objects.all()
    # # for applicants in users:
    # #     form=Applicant_form.objects.get(user=applicants)
    # # ser=[applicant_form.serialize() for applicant_form in form]
    # #     applicants.append(ser)
    # # applicants
    # return JsonResponse([applicant_form.serializer() for applicant_form in form], safe=False)
 




    
