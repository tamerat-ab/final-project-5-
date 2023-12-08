document.addEventListener("DOMContentLoaded", function(){
  front_page();


 
    }) ;
document.addEventListener("DOMContentLoaded", function(){
application();
});

document.addEventListener("DOMContentLoaded", function(){
  sidebar_profile();

  //  chatbox();
 
  // user_dtl();
  all_users();
});


function front_page() {
      console.log("front_page");
      const reg= document.querySelector('#reg');
      // const reg_block= document.querySelector('.class-reg');
      const reg_block= document.getElementById('id-reg');
      console.log(reg_block);
      reg_block.style.display="none";
       reg.onclick=function(e){   
          // e.preventDefault();
          // e.stopPropagation();
        if(reg_block.style.display=="block")
       { reg_block.style.display = 'none';}
       else
          {reg_block.style.display = 'block';}

          
           }
        };


function sidebar_profile(){
 console.log("sidebar_profile");
 fetch('application')
 .then(response=>response.json())
 .then(data=>{console.log(data)
       console.log(data['response']);});
// sidebar char and leave 

       var leave_main= document.querySelector("#leave-main");
       var stat=document.querySelector("#stat");
       const leave=document.querySelector(".leave");
       const onleave=document.querySelector(".onleave");
       const chart=document.querySelector("#chart");
       const leave_form=document.querySelector("#leave-form");
       const leave_btn_ask=document.querySelector(".leave-btn-ask");
       const leave_btn_back=document.querySelector(".leave-btn-back")
       var time_keeping=document.querySelector("#time-keeping");
       const time_keeping_div=document.querySelector(".time-keeping-div");
       const apl_form_div=document.querySelector(".apl-form-div");
       const slide_div=document.querySelector(".slide-div");
       console.log(apl_form_div);
      //  const apl_form=document.querySelector("#apl-form");
      fetch('application')
 .then(response=>response.json())
 .then(data=>{
               console.log(data['response'])
       if(data['response']==true)
       {
       chart.style.display='block';
       leave.style.display='none';
       time_keeping_div.style.display='none';
       apl_form_div.style.display='none'
       }
       else{
        chart.style.display='none';
        leave.style.display='none';
        // time_keeping.style.display='none'
        time_keeping_div.style.display='none'
        leave_form.style.display='none';
        leave_btn_ask.style.display='none';
        leave.leave_btn_back.style.display='none';
        onleave.style.display='none';
        slide_div.style.display='none'
        

        apl_form_div.style.display='block'

       }
      });
       leave_main.onclick=(e)=>{
        user_id=JSON.parse(document.getElementById('user_id').textContent);
        fetch(`${user_id}/is_onwork`)
        .then(reponse=>reponse.json())
        .then(data=>{console.log(data)
      
          if(data.length>0 && data[0]['onleave']==true)
            { 
              const leave_status= data[0]['onleave'] 
              const date=data[0]['date']  
              const leave_date= data[0]['leave_date'] 
              const stat_id=data[0]['stat_id'] 
              const reason=data[0]['reason'] 
              console.log(leave_status)
              console.log(typeof(leave_status))

              onleave.style.display='block';
              leave_btn_ask.style.display='none';
              chart.style.display='none';
              leave_form.style.display='none'
              leave_btn_back.style.display='block'

              leave.style.display='block';    
              const onleave_show=document.querySelector(".onleave-show")
              onleave_show.style.display='block';
              chart.style.display='none';
              time_keeping_div.style.display='none';
              
              // const onleave_show=document.querySelector(".onleave-show")
             const text=`you are on leave now for ${leave_date} days since ${date} for the reason
               specified as  "${reason}", if you would like to return to work please click below`;
               onleave_show.innerHTML=text;
               const leave_cond= document.querySelector('.leave-cond')
               leave_cond.append(text);
               const back_onwork_btn=document.querySelector('.leave-btn-back');
                back_onwork_btn.onclick=(e)=>{
                e.stopPropagation()
                e.preventDefault()
                // const csrf_backonwork=document.querySelector('[name=csrfmiddlewaretoken]').value
                // var csrf_backonwork = document.querySelector('meta[name="csrf-token"]').content;
                // var csrf_backonwork = document.getElementsByName('csrfmiddlewaretoken').value;
                // console.log(csrf_backonwork)
                fetch(`${user_id}/is_onwork`,
                       {method:'DELETE',
                        body:JSON.stringify({id:stat_id,leave:false}),
                        // headers:{'Content-Type': 'application/json',
                        //           'X-CSRFToken':csrf_backonwork}
                                })
                        .then(response=>response.json()
                         .then(data=>{ console.log(data)
                          chart.style.display='none';
                          chart.style.display='none';
                          leave.style.display='none'
                          time_keeping_div.style.display='block'
                          }))
               }
               }
          else{
      //  }})
      
       e.preventDefault();
       e.stopPropagation();
       leave.style.display='block';
       chart.style.display='none';
       time_keeping_div.style.display='none';
       

    //    leave_btn_ask.style.display='block';
    //    leave_btn_back.style.display='block';
       leave_form.style.display='none';
       leave_btn_back.style.display='none';
       onleave.style.display='none';



      leave_btn_ask.onclick=()=>{
        // e.stopPropagation();
        // e.preventDefault();
       const leave_form_submit=document.querySelector('#leave-form-submit');
       console.log(leave_form_submit);
        leave_form.style.display='block'
      leave_form_submit.onclick=(e)=>{ 
        e.stopPropagation();
        e.preventDefault();
        

        const id=JSON.parse(document.getElementById('user_id').textContent);
        const leave_form=document.querySelector('#leave-form');
        const csrf_leave=document.querySelector('[name=csrfmiddlewaretoken]').value;
        // const formLeave=new FormData(leave_form)
        console.log(csrf_leave);
        const reason=document.querySelector('.reason').value;
        const date=document.querySelector('.date').value;
        console.log(date);
        console.log(reason);
        const leave_date=document.querySelector('.leave-period').value;
        console.log(leave_date);
        //  console.log(formLeave);
        fetch(`${id}/is_onwork`,
        {method: 'POST',
         body:JSON.stringify({reason: reason, leave_date: leave_date,date:date}),
        //  body:formLeave,
         headers: {'Content-Type': 'application/json',
                   'X-CSRFToken':csrf_leave}})
          .then(response => response.json())
          .then(data =>{console.log(data)
           
          })

      

        onleave.style.display='block';
        leave_btn_ask.style.display='none';
        chart.style.display='none';
        leave_form.style.display='none'
        leave_btn_back.style.display='block'
      
        leave_btn_back.onclick=()=>{
        leave_btn_ask.style.display='block';
        leave_btn_back.style.display='none';
        onleave.style.display='none'}}
       }

      }}) // if ele end
       }

    

       var leave_main= document.querySelector("#leave-main");
       var stat=document.querySelector("#stat");
      //  const trial=document.querySelector('#trial')
      stat.onclick=()=>{chart.style.display='block';
                     leave.style.display='none'
                     time_keeping_div.style.display='none';
                     window.location.reload();
                    }
       
      // time keeping starts here

      // const time_keeping=document.querySelector('#time-keeping')
      console.log(time_keeping)
      time_keeping.onclick=(e)=>{
        const time_keeping_div=document.querySelector('.time-keeping-div');
        e.stopPropagation();
        e.preventDefault();
        chart.style.display='none';
        leave.style.display='none'
        time_keeping_div.style.display='block'
      var now = new Date().toLocaleString().replace(",","").replace(/:.. /," ");

      //  now= now.format("dd/MM/yyyy hh:mm TT");
      const server_time=document.querySelector('.server-time');
      console.log(server_time);
      server_time.innerHTML=`Server Time : ${now}`;
     
  
    }

       }


function application (){ 
  
    const apl_form=document.querySelector('#apl-form');
    const submit_btn_apl=document.querySelector('#submit-btn-apl');
   console.log(submit_btn_apl)
   console.log(apl_form)
    submit_btn_apl.onclick=(evt)=>{
     const apl_form=document.querySelector('#apl-form');
     const csrftoken2=document.querySelector('[name=csrfmiddlewaretoken]').value;
     console.log(csrftoken2);
     evt.preventDefault();
     evt.stopPropagation();
   
     const leave=document.querySelector(".leave");        
     const chart=document.querySelector("#chart");
     const time_keeping_div=document.querySelector(".time-keeping-div");
     const apl_form_div=document.querySelector(".apl-form-div");

     chart.style.display='block';
     leave.style.display='none';
     time_keeping_div.style.display='none';
     apl_form_div.style.display='none'


    var dataStorage= function(){
     const firstname=document.querySelector('#first-name').value
     console.log(firstname)
     const secondname=document.querySelector('#second-name').value
     const lastname=document.querySelector('#last-name').value
     var number=document.querySelector('#age').value
     console.log(number)
     const hiredate=document.querySelector('#hiredate').value
     const department=document.querySelector('#department').value
     const job=document.querySelector('#job').value
     const salary=document.querySelector('#salary').value
     const work=document.querySelector('#work').value
     console.log(firstname);
data=JSON.stringify({firstname:firstname,secondname:secondname,lastname:lastname,
  number:number,hiredate:hiredate,department:department,job:job,salary:salary,work:work})
  return data};
  
  console.log(dataStorage())
    console.log('firstname')  
        fetch('applicant_form', 
                    { method:'POST',
                     body:dataStorage(),
                     header:{'Content-Type': 'application/json',
                       'X-CSRFToken':csrftoken2}}
                     )
              .then(response => response.json())   //what going on here please correct the response prt
              .then(data => {console.log(data)

                
                
              
                           const user_image = document.querySelector('#user_image');
                           
                                 const img=data[0]['profile_picture'];
                               
                                console.log(img)
                                const div_upld=document.querySelector('#div-upld');
                                const img_div = document.createElement('img');
                                img.id='img-div';
                                img_div.setAttribute('src',`${img}`)
                                console.log(img_div)
                                div_upld.appendChild(img_div)
                               
                             
                                   })}


   
}

// edit application letter here
document.addEventListener('DOMContentLoaded',()=>{
  console.log('here is the update form')

const adm_id =JSON.parse(document.getElementById('user_id').textContent);    
fetch(`${adm_id}/edit`) // this fetchs information from the server if the manager already allowed the employee to edit his profile
.then(response=>response.json())
.then(data=>{console.log(data)
            console.log(data[0]['status'])
        if(data[0]['status']===true)
                                    {
                                      //  const link= "/application" 
                                      var link_url=document.createElement('div');
                                        
                                            // this creates a link in the users account
                              
                                     link_url.setAttribute('class','link-a');
                                     link_url.id='link-a'
                                     console.log(link_url);
                                     link_url.append(document.createTextNode('Edit Application'));
                                     console.log(link_url)
                                     const update=document.querySelector('.sidebar-index');
                                     console.log(update)
                                     
                                     update.append(link_url);
                                     console.log(update)
                                     link_url.onclick=(e)=>{ //here begins
                                                            e.preventDefault();
                                                            console.log(e.target)
                                                            e.stopPropagation();
                                      console.log( document.querySelector('.sidebar-index'))
                                      const apl_form=document.querySelector('#apl-form');
                                      const leave=document.querySelector(".leave");        
                                      const chart=document.querySelector("#chart");
                                      const time_keeping_div=document.querySelector(".time-keeping-div");
                                      const apl_form_div=document.querySelector(".apl-form-div");
                                      const apl_clone_div=document.querySelector(".apl-clone-div");
                                      const clone_scroll=document.querySelector('.clone-scroll');
                                      const h4=document.createElement('h4');
                                      h4.innerHTML='EDITING APPLICATION FORM';
                                      chart.style.display='none';
                                      leave.style.display='none';
                                      time_keeping_div.style.display='none';
                                      apl_form_div.style.display='none'
                                      const apl_clone=apl_form.cloneNode(true)
                                      apl_clone.id = 'apl-clone'; // convert the cloned form id to differentiate it from the original
                                      
                                      console.log(apl_clone)
                                      clone_scroll.append(apl_clone)
                                      apl_clone_div.append(h4,clone_scroll);
                                      console.log(apl_clone_div)
                                      apl_clone_div.style.display='block'

                                              //  }}});
                                      
                                      function dataStorage(){
                                      const firstname=apl_clone.querySelector('#first-name').value        
                                      const secondname=apl_clone.querySelector('#second-name').value
                                      const lastname=apl_clone.querySelector('#last-name').value
                                      var number=apl_clone.querySelector('#age').value
                                      console.log(number)
                                      const hiredate=apl_clone.querySelector('#hiredate').value
                                      const department=apl_clone.querySelector('#department').value
                                      const job=apl_clone.querySelector('#job').value
                                      const salary=apl_clone.querySelector('#salary').value
                                      const work=apl_clone.querySelector('#work').value
                                      console.log(firstname);
                                      data=JSON.stringify({firstname:firstname,secondname:secondname,lastname:lastname,
                                    number:number,hiredate:hiredate,department:department,job:job,salary:salary,work:work})
                                    return data 
                                   };
                                    console.log(dataStorage)
                                    console.log(document.querySelector('#submit-btn-apl'))
                                    const submit=document.querySelector('#submit-btn-apl')
                                    const submit_update=document.querySelector('#apl-clone')
                                    const csrf_update=document.querySelector('[name=csrfmiddlewaretoken]').value
                                     submit_update.onsubmit=(e)=>{
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const data=dataStorage()
                                    console.log(dataStorage())
                                    console.log('firstname')  
                                        fetch('applicant_form', 
                                                    { method:'UPDATE',
                                                     body:data,
                                                     header:{'Content-Type': 'application/json',
                                                       'X-CSRFToken':csrf_update}}
                                                     )
                                              .then(response => response.json())   //what going on here please correct the response prt
                                              .then(data => {console.log(data)})}
                                   
                                      }

                                    } })     
     
      
})


document.addEventListener('DOMContentLoaded', function(){
  console.log('new DOMContentLoaded');
// THE BEGIN IS HERE

console.log(document.getElementById('apl-clone'))
 fetch('all_users')
  .then(response => response.json())
  .then(  data1=>{ console.log(data1)
    for(let i=0; i<data1.length; i++) {
                  const id=data1[i]['user_id']
                  const  name=data1[i]['name']
                  
  fetch(`${id}/stat`)    
      .then(response => response.json())
      .then( data2 =>{console.log(data2)
        // console.log(data2['static'][0]['onleave'])
      // //   if (data2['static'][0]['onleave'] && data2['static'][0]['onwork'])
      // //  {
      //   const status_leave=data2['static'][0]['onleave']
      //   const status_work=data2['static'][0]['onwork']
      //   //  }
        const firstname=data2['applicant'][0]['firstname']
        console.log(firstname)
        const date_hired=data2['applicant'][0]['date_hired']
        const department=data2['applicant'][0]['department']
        console.log(department)
        const job_title=data2['applicant'][0]['job_title']
        console.log(job_title)
        const profile_picture=data2['applicant'][0]['profile_picture']
        const admin_id=data2['applicant'][0]['user']
        const hour=data2['hours']
        const salary=data2['salary']
        const last_updated=data2['wage'][0]['last_updated']
        const rate=data2['wage'][0]['rate']
        console.log(rate)
        
        // const text=localStorage.getItem(`${id}`) // local storage assigned for each user with respect to their id
        const admin_right=document.querySelector('.admin-right')

        

       const adm_dtl=document.createElement('div')
       adm_dtl.setAttribute('class', 'adm-dtl')
       const adm_first=document.createElement('div')
       adm_first.setAttribute('class', 'adm-first') 
       const adm_prof=document.createElement('div')
       adm_prof.setAttribute('class', 'adm-prof') 
       const adm_photo=document.createElement('div')
       adm_photo.setAttribute('class', 'adm-photo')
       console.log(adm_photo)
       const adm_img=document.createElement('img')
       adm_img.setAttribute('src', profile_picture)
       adm_img.id='adm-img'
       adm_photo.appendChild(adm_img)
       const adm_name=document.createElement('div')
       adm_name.setAttribute('class','adm-name')
       adm_name.append(document.createTextNode(`Name: ${firstname}`))
      //  adm_name.setAttribute('class', 'adm-name')
       const adm_hired=document.createElement('div')
       adm_hired.setAttribute('class', 'adm-hired')
       adm_hired.append(document.createTextNode(`Date Hired: ${date_hired}`))
       const adm_dept=document.createElement('div')
       adm_dept.setAttribute('class', 'adm-dept')
       adm_dept.append(document.createTextNode(`Department:${department}`))
       const adm_job=document.createElement('div')
       adm_job.setAttribute('class', 'adm-job')
       adm_job.append(document.createTextNode(`Job Title ${job_title}`))
       const adm_second=document.createElement('div')
       adm_second.setAttribute('class', 'adm-second')
       const adm_data=document.createElement('div')
       adm_data.setAttribute('class', 'adm-data')
       const adm_onwork=document.createElement('div')
       adm_onwork.setAttribute('class', 'adm-onwork')
       const adm_onleave=document.createElement('div')
       adm_onleave.setAttribute('class', 'adm-onleave')
       const adm_hour=document.createElement('div')
       adm_hour.setAttribute('class', 'adm-hour')
       adm_hour.append(document.createTextNode(`Total Hour: ${hour}`))
       const adm_rate=document.createElement('div')
       adm_rate.setAttribute('class', 'adm-rate')
       adm_rate.append(document.createTextNode(`Rate: ${rate}`))
       const adm_salary=document.createElement('div')
       adm_salary.setAttribute('class', 'adm-salary')
       adm_salary.append(document.createTextNode(`Salary ${salary}`))
      //  const adm_edit=document.createElement('button')
      //  adm_edit.setAttribute('data', `${id}`)
      //  adm_edit.setAttribute('class', 'adm-edit')
      //  adm_edit.append(document.createTextNode(text))
       const canvas=document.createElement('canvas')
       canvas.setAttribute('class', 'adm-canvas')
       const adm_chrt=document.createElement('div')
       adm_chrt.setAttribute('class', 'adm-chrt')
       
       adm_chrt.append(canvas)
       adm_prof.append(adm_name,adm_job,adm_hired,adm_dept)
       adm_first.append(adm_photo,adm_prof)
       adm_data.append(adm_onwork,adm_onleave,adm_salary,adm_rate,adm_hour)
       adm_second.append( adm_chrt,adm_data)
       adm_dtl.append(adm_first,adm_second)
       admin_right.append(adm_dtl);
       console.log(admin_right)
       
       if (data2['static'].length>0){
             const status_leave=data2['static'][0]['onleave']
           const status_work=data2['static'][0]['onwork']
            if(status_leave==true){
                                          const status_false=document.createElement('div')
                                          status_false.setAttribute('class','status-onwork')
                                          status_false.id='status-onwork'
                                          
                                           adm_data.append(status_false.appendChild(document.createTextNode('On leave now')))
                                        }
                                        
            else if (status_work==true){ status_true=document.createElement('div')
                                         status_true.setAttribute('class','status-onwork')
                                      
                                         adm_data.append(status_true.appendChild(document.createTextNode('On work now')));
                                      }
            else if (status_work==false){ status_true=document.createElement('div')
            status_true.setAttribute('class','status-onwork')

            adm_data.append(status_true.appendChild(document.createTextNode(' off duty now')))
          }
            else{const status_none=document.createElement('div');
                  status_none.setAttribute('class','status-onwork')
                   adm_data.appendChild(status_none.appendChild(document.createTextNode('off duty now')));}
                 }
          else{const status_none=document.createElement('div');
                  status_none.setAttribute('class','status-onwork');
                  status_none.id='status-none';
                 adm_data.appendChild(status_none.appendChild(document.createTextNode('off duty now')))}
      
      const adm_edit=document.createElement('button')
      adm_edit.setAttribute('data', `${id}`)
      adm_edit.setAttribute('class', 'adm-edit')           
      if(data2['edit'][0]['status']==true){        
      adm_edit.append(document.createTextNode('Editing'))
      adm_data.append(adm_edit)}
      else{
      adm_edit.append(document.createTextNode('Edit'))
      adm_data.append(adm_edit)
      }
            const permit=document.querySelectorAll('.adm-edit')
             console.log(permit)
           
          permit.forEach(permit=>{permit.onclick=(e)=>{
      
            e.preventDefault();
            e.stopPropagation();
           console.log(e.target.innerHTML)
         
            const id=e.target.getAttribute('data')
            console.log(id)
            if(e.target.innerHTML=='Edit'){
              const csrf_permit=document.querySelector('[name="csrfmiddlewaretoken"]').value
               fetch(`${id}/edit`,{
                method: 'UPDATE',body:JSON.stringify({ is_allowed:true}),headers:{'Content-Type': 'application/json','X-CSRFToken':csrf_permit}}) 
                .then(response=>response.json())
                .then(data=>{console.log(data)
                      permit.innerHTML='Editing'
                     })}
          
            else if (e.target.innerHTML=='Editing'){
                  const csrf_permit1=document.querySelector('[name="csrfmiddlewaretoken"]').value
              fetch(`${id}/edit`,{
                     method: 'UPDATE',body:JSON.stringify({ is_allowed:false}),headers:{'Content-Type': 'application/json','X-CSRFToken':csrf_permit1}})
                     .then(response=>response.json())
                     .then(data=>{console.log(data) ; permit.innerHTML='Edit'})
                 
        // });
              }
       
    //   console.log('permit')
    //   const status=document.querySelector('.adm-edit')
    //   console.log(status.innerHTML)
    //   if (status.innerHTML=='Edit')
    //   localStorage.setItem(`${id}`,'Editing') // store edititng status information in localStorage
    // else{localStorage.setItem(`${id}`,'Edit')}
      
     
      
       }})

   
  fetch("https://cdn.jsdelivr.net/npm/chart.js")  
  .then(  Chrt=>{ console.log(Chrt)
       
    
  const ctx = canvas

  new Chart(ctx, {
    type: 'line',
    data: {
       labels:data2['date'],
     
      datasets: [{
        label: 'Employee Work Progress',
        data: data2['y_axis'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


})




  });
  
}


})


  // THE END IS HERE //
  fetch("https://cdn.jsdelivr.net/npm/chart.js")  
  .then(chart=>{ console.log(chart)
  //  fetch('user_stat')
  //   .then(response=>response.json())
  //   .then( data=>{console.log(data)

      const user_id = JSON.parse(document.getElementById('user_id').textContent);
      console.log(user_id);
      fetch(`${user_id}/stat`)
      .then(response => response.json())
      .then(data =>{console.log(data)
        const wage_rate=data['wage'][0]['rate']
        const last_update_wage=data['wage'][0]['last_updated']
        const total_salary=document.querySelector('.total-salary')
        const total_hour=document.querySelector('.total-hour')
        const wage=document.querySelector('.wage-rate')
        const current_wage=document.querySelector('.wage-update')
        wage.append(document.createTextNode(wage_rate))
        current_wage.append(document.createTextNode(last_update_wage))
        total_salary.append(document.createTextNode( data['salary']))
        total_hour.append(document.createTextNode(innerHeight=data['hours']))
        console.log(data['date'])
  const ctx = document.getElementById('myChart')

  new Chart(ctx, {
    type: 'line', 
    data: {
      labels:data['date'],
    
      datasets: [{
        label: 'Progress', 
        data: data['y_axis'],
        borderWidth: 1,

        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1

      }
        ]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

})
// 

  });
  // }
});







function all_users(){
                                                    //  will be comming to here later very important
  fetch('all_users') // fetchs all information about all users
  
  .then(response => response.json())
  .then(data => {console.log(data)
  for (var i = 0; i < data.length; i++)  // iterates on each users inforamtion 
   {
    
    // creates variables for each inforamtion of the users
      const username=data[i]['name']; const id=data[i]['id']; const firstname=data[i]['firstname'];
      const lastname=data[i]['lastname']; const dep=data[i]['department']; const date_hired=data[i]['date_hired'];
      const job_title=data[i]['job_title']; const profile_picture=data[i]['profile_picture'];const salary=data[i]['salary'];
      const userid=data[i]['user_id'];const avatar=data[i]['avatar'];

      const dtl_id = JSON.parse(document.getElementById('user_id').textContent);
     console.log(profile_picture);

     if(dtl_id !=userid)  {
                        //creates small profile about individual users
                          const chat_img = document.createElement('img');
                          chat_img.setAttribute('id',`userid${userid}`);
                          chat_img.setAttribute('class','chat-img');
                          chat_img.setAttribute('src', profile_picture);
                          console.log(chat_img);
                          
                          const job=document.createElement('div');
                          job.id='job'
                          job.append(document.createTextNode(`Job Title: ${job_title}`));
                          const department=document.createElement('div');
                          department.id='department'
                          department.append(document.createTextNode(`Department:${dep}`));
                          const name=document.createElement('div');
                          name.id='name'
                          name.append(document.createTextNode(`Name: ${firstname}`));
                          const hired=document.createElement('div');
                          hired.id='hired'
                          hired.append(document.createTextNode(`Hired Date: ${date_hired}`))
                          console.log(chat_img.getAttribute('src'));

                          const  dtl_btn= document.createElement('div');
                          dtl_btn.setAttribute('id',userid)
                          dtl_btn.setAttribute('class','dtl-btn')
                          const dtl_content=document.createElement('div')
                          dtl_content.setAttribute('class','dtl-content')
                          const div=document.createElement('div');
                          div.setAttribute('id','dtl-profile')
                          div.append(chat_img,name,hired,job,department);
                          
                          dtl_btn.appendChild(document.createTextNode(firstname))
                          dtl_content.appendChild(div);
                          const user_dtl=document.createElement('div')
                          user_dtl.setAttribute('class','user-dtl')
                          user_dtl.append(dtl_btn,dtl_content)
                         
                          const dropdown_content=document.querySelector('.dropdown-content')
                          dropdown_content.appendChild(user_dtl)  
    }
   }


  const chat_container=document.querySelector('.chat-container');
   chat_container.style.display='none';

  const dtl_btn=document.querySelectorAll('.dtl-btn')
  // const chat_submit=document.querySelector('.chat-submit');
  // chat_submit.disabled = true;

  dtl_btn.forEach(dtl_btn=>{dtl_btn.onclick=(e)=>{
          e.stopPropagation();
          e.preventDefault();
          
          

          console.log(e.target);
          // const id=e.target.id
          const id=e.target.getAttribute('id')

    const chat_container=document.querySelector('.chat-container');
    chat_container.style.display='block';

    const chat_submit=document.querySelector('.chat-submit');
    chat_submit.disabled = true;
    const textarea=document.querySelector('.chat-textarea');
     textarea.onkeyup =()=>{
      if(textarea.value.length > 0)
      { chat_submit.disabled = false;}
      else{ chat_submit.disabled = true}
      
      
      // chat_submit.disabled=false;
      }

    fetch(`${id}/message`)
    .then(response=>response.json())
    .then(data=>{console.log(data)
          console.log(id)
      
          const test = JSON.parse(document.getElementById('user_username').textContent);
          console.log(test)
        
          console.log(data['msgs'].length)

    for(let i=0; i<data['msgs'].length; i++)
     {
          const reciever=data['msgs'][i]['reciever']
          const sender_id=data['msgs'][i]['sender_id']
          const msg=data['msgs'][i]['msg']
          const time=data['msgs'][i]['time']
          console.log(reciever)
          console.log(data['msgs'][i]['sender'])
          console.log(id)
          const main_sender=data['msgs'][i]['sender']
          console.log(sender_id)
          const main_reciever=data['msgs'][i]['reciever']
          console.log(reciever)

       

    var scrol=document.querySelector('.scroll')
    if(main_sender){
     
      // var scrol=document.querySelector('.scroll')
      const send_container=document.querySelector('.container')
      clone_send=send_container.cloneNode(true)
      clone_send.querySelector('#sender-img').setAttribute('src',main_sender.picture)
      clone_send.querySelector('#sender-msg').append(document.createTextNode(main_sender.msg))
      clone_send.querySelector('#time-right').append(document.createTextNode(main_sender.time))
      scrol.appendChild(clone_send)
    } //dont fornget 

    else if(main_reciever){

    
      const recieve_container=document.querySelector('.container-darker')
      clone_recieve=recieve_container.cloneNode(true)
      clone_recieve.querySelector('#reciever-img').setAttribute('src',main_reciever.picture)
      clone_recieve.querySelector('#reciever-msg').append(document.createTextNode(main_reciever.msg))
      clone_recieve.querySelector('#time-left').append(document.createTextNode(main_reciever.time))
       scrol.append(clone_recieve)
      // console.log(scrol)
     
    }
    // scrol.scrollTop =scrol.scrollHeight                     
    }// THE FOR LOOP ENDS HERE
    scrol.scrollTop =scrol.scrollHeight
  
  console.log(document.querySelector('.scroll'));
  //   console.log(id)
    inner_pic=document.getElementById(`userid${id}`).getAttribute('src');
    console.log(inner_pic);
  
    
    const head_img=document.querySelector('#header-img');
    head_img.setAttribute('src',inner_pic)

 
      const chat_div=document.querySelector('.chat-div');
    console.log(chat_div);
     
   const chat_header= document.querySelector('.chat-header');
      chat_header.onclick=function(e)
      { e.preventDefault(); 
       e.stopPropagation();
       const chat_container=document.querySelector('.chat-container');
       chat_container.style.display='none';
      }

     

       const chat_submit=document.querySelector('.chat-submit');
        const chat_csrf=document.querySelector('[name=csrfmiddlewaretoken]').value
        console.log(chat_csrf);
        console.log(chat_submit)
      chat_submit.onclick = function(e){
        e.preventDefault();
        e.stopPropagation();
        // chat_submit.disabled = true;
        const message=document.querySelector('.chat-textarea').value;
        
        console.log(message);
       const chat_csrf=document.querySelector('[name=csrfmiddlewaretoken]').value
       console.log(chat_csrf);
        fetch(`${id}/message`,
              {method: 'POST',
               body: JSON.stringify({message:message}),
               headers:{'Content-Type':'media-type',
                         'X-CSRFToken':chat_csrf},
              })
               .then(response =>response.json())
               .then(data =>{console.log(data)
                var scrol=document.querySelector('.scroll')
                scrol.innerHTML = ''        
    for(let i=0; i<data['msgs'].length; i++)
    {
         const reciever=data['msgs'][i]['reciever']
         const sender_id=data['msgs'][i]['sender_id']
         const msg=data['msgs'][i]['msg']
         const time=data['msgs'][i]['time']
         console.log(reciever)
         console.log(data['msgs'][i]['sender'])
         console.log(id)
         const main_sender=data['msgs'][i]['sender']
         console.log(sender_id)
         const main_reciever=data['msgs'][i]['reciever']
         console.log(reciever)

      

   var scrol=document.querySelector('.scroll')
  //  scrol.innerHTML = ''
   if(main_sender){
    
     // var scrol=document.querySelector('.scroll')
     const send_container=document.querySelector('.container')
     clon_send=send_container.cloneNode(true)
     lone_send.querySelector('#sender-img').setAttribute('src',main_sender.picture)
     clon_send.querySelector('#sender-msg').append(document.createTextNode(main_sender.msg))
     clon_send.querySelector('#time-right').append(document.createTextNode(main_sender.time))
     scrol.appendChild(clon_send)
   } //dont fornget 

   else if(main_reciever){

   
     const recieve_container=document.querySelector('.container-darker')
      clon_recieve=recieve_container.cloneNode(true)
      clon_recieve.querySelector('#reciever-img').setAttribute('src',main_reciever.picture)
      clon_recieve.querySelector('#reciever-msg').append(document.createTextNode(main_reciever.msg))
      clon_recieve.querySelector('#time-left').append(document.createTextNode(main_reciever.time))
      scrol.append(clon_recieve)
     // console.log(scrol)
    
   }
                         
   }// THE FOR LOOP ENDS HERE
    scrol.scrollTop =scrol.scrollHeight  
    const text=document.querySelector('.chat-textarea') 
    console.log(text)
    text.value = '' 
    document.querySelector('.chat-submit').disabled = true
                } )
                  
      }

    })
  }});

  });
}





  
document.addEventListener('DOMContentLoaded',function(){
  console.log('new DOMContentLoaded');
fetch('new_picture')
.then(response => response.json())
.then(data =>{console.log(data)

  const img=data[0]['photo'];
                console.log('where is the img')
                console.log(img)
              
                
                const div_upld=document.querySelector('#div-upld');
                const img_div = document.createElement('img');
                img_div.id='img-div';
                img_div.setAttribute('src',`${img}`)
                console.log(img_div)
                div_upld.appendChild(img_div)
                
                const update_pic_div=document.querySelector('.update-pic-div');
                console.log(update_pic_div)
                update_pic_div.style.display='none';
                const update_pic=document.querySelector('.update-pic');
                update_pic.onclick=(e)=>{
                  e.preventDefault();
                  e.stopPropagation()
                  const update_pic_div=document.querySelector('.update-pic-div');
                  update_pic_div.style.display='block'
                  update_pic.style.display='none';
                }
                const sbt_newphoto=document.querySelector('.sbt-newphoto')
                sbt_newphoto.onsubmit=(e)=>{
                  e.preventDefault();
                  e.stopPropagation(); 
                  update_pic_div.style.display='none'
                  update_pic.style.display='block'}

                const animation=document.querySelector('.animation');
                console.log(animation)
                let current = new Date();
                let today = current.toLocaleDateString('en-EU',{weekday: 'long'});
                console.log(today);
                animation.append(document.createTextNode(`Hello ${data[0]['user'].charAt(0).toUpperCase()+data[0]['user'].slice(1)} Enjoy your ${today} on work!!`))
                console.log(data[0]['user'].toUpperCase())
                // $('#cdiv-upld').load(document.URL +  ' #div-upld');
})


});



function save() {   
  var checkbox = document.getElementById("ck1");
  localStorage.setItem("ck1", JSON.stringify(checkbox.checked));  
}
function isChecked(isOn) {
    if (isOn === true) {
        $("#time_onwork").show();
    } else {
        $("#time_onwork").hide();
    }
}

//for loading

var checked = JSON.parse(localStorage.getItem("ck1"));
    // document.getElementById("ck1").checked = checked;

console.log(checked);

document.addEventListener('DOMContentLoaded', function(){
  
  var checked = JSON.parse(localStorage.getItem("ck1"));

     document.getElementById("ck1").checked = checked;
     if (checked === true) {
     
  } else {
   
  }
    $(".switch input").on("change", function(e) {
    const if_checked = e.currentTarget.checked;
          const date=new Date()
    if (if_checked === true) {
      
     const user_id=JSON.parse(document.getElementById('user_id').textContent)
     const csrf_workon=document.querySelector('[name=csrfmiddlewaretoken]').value;
     console.log(csrf_workon);
     console.log(user_id);
    
             fetch(`${user_id}/is_onwork`,
             {method: 'UPDATE',
              body:JSON.stringify({is_onwork:true,is_onleave:false}),
             
              headers: {'Content-Type': 'application/json',
                        'X-CSRFToken':csrf_workon}})

             .then(response => response.json())
             .then(data =>{console.log(data)
              const time_keeping_div=document.querySelector('.time-keeping-div')
              const time_onwork=document.createElement('div')
              time_onwork.id="time_onwork"
              console.log(time_onwork)
               time_onwork.append(document.createTextNode(`${data['response']}`));
               console.log(time_onwork)
               time_keeping_div.append(time_onwork)
               console.log(time_keeping_div)
             
              })
           
  } 
  else {
    
     const user_id=JSON.parse(document.getElementById('user_id').textContent);
     const csrf_workoff=document.querySelector('[name=csrfmiddlewaretoken]').value;
     console.log(csrf_workoff);
     console.log(user_id)
   
     fetch(`${user_id}/is_onwork`,
     {method: 'UPDATE',
      body:JSON.stringify({is_onwork:false,is_onleave:false}),
     
      headers:{'Content-Type':'application/json','X-CSRFToken':csrf_workoff}})
     .then(response => response.json())
     .then(data =>{console.log(data)
     
      const time_keeping_div=document.querySelector('.time-keeping-div');
      const time_onwork=document.querySelector('#time_onwork');
      console.log(time_onwork);
      time_onwork.remove();
      console.log(time_keeping_div.children)
      // const time_onwork=document.createElement('div')
      $(".time-keeping-div").append(time_onwork.append(document.createTextNode(`you are off-work since ${time_onwork}`)))
   
      })
    
  }
  });
});

// set rate here/

document.addEventListener('DOMContentLoaded',function() {
console.log('rate')

  const dj_submit=document.querySelector('.dj-submit');
  const csrf_rate=document.querySelector('[name=csrfmiddlewaretoken]').value;
  var input = document.querySelector('input[type="file"]')
  console.log(csrf_rate)
  dj_submit.onclick=(e)=>{
   e.preventDefault();
   e.stopPropagation();
   

  var input = document.querySelector('input[type="file"]')
  console.log(input.files[0])
    // const dj =dj_input.files[0]['name']
    // console.log(dj)
    const data=new FormData()
     data.append('file', input.files[0])

    for(item of data)
    {console.log(item[0],item[1 ])}
   
    console.log(csrf_rate)
    fetch('applicant_form',
    {method:'UPDATE',
     body:input.files[0]
  })
     .then(response => response.json())
     .then(data =>{console.log(data)})
  }
  // return false;
});

document.addEventListener('DOMContentLoaded',()=>{
fetch('new_picture')
.then(response => response.json())
.then(data=>{console.log(data)})
});


document.addEventListener('DOMContentLoaded',()=>{
  console.log('whereis rate')

  const new_from=document.querySelector('.new-form')
  const new_submit=document.querySelector('.new-submit')
  new_from.onsubmit=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    csr=document.querySelector('[name=csrfmiddlewaretoken]').value;
    console.log(csr)
    const rate=document.querySelector('.new-input').value;
    console.log(rate)
    fetch('set_rate',{method:'UPDATE',body:JSON.stringify({rate:rate}),
    headers:{'Content-type':'application/json',
             'X-CSRFToken':csr}} )
    .then(response=>response.json())
    .then(data=>{console.log(data)
    
    
    })
  //  window.location.reload()

  }
});

document.addEventListener('DOMContentLoaded',()=>{
  console.log('document')
//   const permit=document.querySelectorAll('.adm-edit')
//   // const permit=document.querySelector('.adm-edit')
//   console.log(permit)
// permit.forEach(permit=>{permit.onclick=(e)=>{
//   console.log('permit')
//   e.preventDefault();
//   e.stopPropagation();
//   console.log('permit')
//   const id=e.target.getAttribute('data')
//   if(e.target.innerHTML=='perit Edit'){

//     fetch(`${id}/edit`,{
//       method: 'UPDATE',body:JSON.stringify({ is_alloed:true})})
//       .then(response=>response.json())
//       .then(data=>{console.log(data)
//             permit.innerHTML='Edited'})}

//   else if (e.target.innerHTML=='Edited'){
//     fetch(`${id}/edit`,{
//            method: 'UPDATE',body:JSON.stringify({ is_alloed:false})
//            .then(response=>response.json())
//            .then(data=>{console.log(data)
//             permit.innerHTML='pemit Edit'})
//     });
//   }
   
//       }})

    })
//   }
// }})
// });
// document.addEventListener('DOMContentLoaded',()=>{
//    fetch('edit')
//    .then(response=>response.json())
//    .then(data=>{console.log(data)
//     if(data['response']==true){
//      const link='{% url "application" %}'
//      const update=document.querySelector('.update');
//      update.append(document.createTextNode(link))
//      update.onclick=()=>{
//       const apl_form=document.querySelector('#apl-form');
//       const apl_form_div=document.querySelector('.apl-form-div');
//       apl_form.style.display='none';
//       const apl_clone=apl_form.cloneNode(true);
//       apl_form_div.append(apl_clone)
//       }

//     }
//   })

// })





















   // async()=>{
      //   try { await fetch('applicant_form', 
      //               { method:'POST',
      //                body:data,
      //                header:{'Content-Type': 'multipart/form-data',
      //                  'X-CSRFToken':csrftoken2}}
      //                )
      //         .then(response => response(json))
      //         .then(data => {console.log(data)})
      //               // return await data_response.json();
      //              }
      //              catch(err){console.error(err);}
           
      //  }
// document.addEventListener("DOMContentLoaded", function(){           
// // function new_picture(){
//   const div_upld=document.querySelector("#div-upld");
//   console.log(div_upld);
//   const form=document.querySelector("#form-upld");
//   console.log(form)
//   const csrftoken_upld=document.querySelector('[name=csrfmiddlewaretoken]').value;
//   console.log(csrftoken_upld)
//   const sub_upld=document.querySelector("#sub-upld");
//   form.style.display='none';
//   div_upld.onclick=(e)=>{
//      e.preventDefault();
//     e.stopPropagation();
//     // const form_upld=document.getElementById("form-upld");
  
//     // if(form_upld.style.display=='none'){
//       form.style.display='block';
      
//       sub_upld.onclick=(e)=>{
       
//          e.stopPropagation()
//          e.preventDefault()
       
//         const img_id = JSON.parse(document.getElementById('user_id').textContent);
//         console.log(img_id)
    
        
        
//         // const newpic=document.getElementById("newpic").files[0].name;
//          const newpic=document.getElementById("newpic").value;
//         const csrftoken_upld=document.querySelector('[name=csrfmiddlewaretoken]').value;
      
//         const form=document.getElementById("form-upld");
//         //  var newupd=new FormData(document.querySelector('#form-upld'));
//         console.log(form)
//         var formdata = new FormData(form);  

        
       
//          console.log(formdata);
//         // for (var [key, value] of formData.entries()) { 
//         //   console.log(key, value);}
//         console.log(newpic)
      
//         console.log(csrftoken_upld)
//          fetch(`${img_id}/new_picture`,
      
//               {method:'UPDATE',
//                body:{"data":newpic},
//               //  body:JSON.stringify({newpic:newpic}),
//                headers:{'Content-Type':'multipart/form-data',
//                          'X-CSRFToken':csrftoken_upld}})
//                .then(response => response.json())
//                .then(data=>{console.log(data)
//                 // const img=data[2]['avatar'];
//                 // console.log('where is the img')
//                 // console.log(img)
//                 // const div_upld=document.querySelector('#div-upld');
//                 // const img_div = document.createElement('img');
//                 // img.id='img-div';
//                 // img_div.setAttribute('src',`${img}`)
//                 // console.log(img_div)
//                 // div_upld.appendChild(img_div)

//               })
//        form.style.display='none';
//       //  const div_upld=document.querySelector('#div-upld');
//       //  const img_div = document.createElement('img');
//       //  img.id='img-div';
//       //  img_div.setAttribute('src',)


//       }
//     // }
 
// }           
// })   


                                
      // // console.log(link_url)
      // const link_url=document.querySelector('.link-a');
      // console.log(link_url);
      // link_url.onclick=(e)=>{ //here begins
      //               e.preventDefault();
      //               e.stopPropagation();
      //               console.log(e.target)
      //               const apl_form=document.querySelector('#apl-form');
      //               console.log(apl_form)
      //               const apl_form_div=document.querySelector('.apl-form-div');
                    
      //               const apl_clone=apl_form.cloneNode(true);
      //               console.log(apl_clone)
      //               apl_form_div.append(apl_clone)
      //               const submit_btn_apl=document.querySelector('.submit-btn-apl');
      //               data()
      //               print(data());
      //               const csrfedit=document.querySelector('[name="csrfmiddlewaretoken"]').value;
      //               submit_btn_apl.onclick=function(){
      //                 fetch('applicant_from',{method: 'UPDATE', body: data(),
      //                       headers: {'Content-Type': 'application/json', 'X-CSRFToken':csrfedit}})
      //                       .then(response=response.json())
      //                       .then(data=>{console.log(data)
      //                       const adm_id =JSON.parse(document.getElementById('user_id').textContent); 
      //                             fetch(`${adm_id}/edit`,{method: 'UPDATE', body:JSON.stringify({'is_allowed': 'false'})}) }) 
      //               }
                
                
      //               } // endes


       // console.log(scrol(data))
                // const scrol=scroll.cloneNode(true);
            
              // for(let i=0; i<data.length; i++){
              // //   console.log(scroll);
              // // console.log( scroll.querySelector('#reciever-img'));
              // const reciever=data['msgs'][i]['reciever']
              // const sender_id=data['msgs'][i]['sender_id']
              // const msg=data['msgs'][i]['msg']
              // const time=data['msgs'][i]['time']
              // console.log(reciever)
              // console.log(data['msgs'][i]['sender'])
              // console.log(id)
              // const main_sender=data['msgs'][i]['sender']
              // console.log(main_sender)
              // const main_reciever=data['msgs'][i]['reciever']
              // console.log(main_reciever)

              // scrol.querySelector('#reciever-img').setAttribute('scr',main_reciever.picture)
              // if( scrol.querySelector('#sender-img')){
              // scrol.querySelector('#sender-img').setAttribute('scr',main_sender.picture)}
              // scroll.querySelector('#reciever-msg').innerHTML=main_reciever.msg
              // if( scrol.querySelector('#sender-msg')){
              // scrol.querySelector('#sender-msg')=main_sender.msg}
              // scrol.querySelector('#time-left').innerHTML=main_reciever.time
              // // scroll.querySelector('#time-right').innerHTML=main_sender.time
              // console.log(scrol)
              // // scroll.querySelector('#sender-img').innerHTML=main_sender.picture
              // // scroll.querySelector('#sender-img').innerHTML=main_sender.picture
              // // scroll.querySelector('#sender-img').innerHTML=main_sender.picture
              // }
             