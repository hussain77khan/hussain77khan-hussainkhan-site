const translations={
 ar:{home:'الرئيسية',portfolio:'أعمالي',films:'الأفلام',plugins:'البرامج والإضافات',dctl:'DCTL',downloads:'التحميلات',about:'من أنا',contact:'تواصل',welcome:'مرحباً بكم في عالمي',heroTitle:'حسين خان',heroText:'أصنع قصصاً تُلهم الناس، وأطوّر أدوات تمكّن صُنّاع المحتوى.',watch:'شاهد أعمالي',browse:'تصفح الإضافات',featured:'أقسام مختارة',featuredSub:'الأفلام، الأدوات والبرامج التي أعمل عليها.',viewMore:'عرض المزيد',rights:'جميع الحقوق محفوظة',latest:'أحدث المنتجات',latestSub:'أدوات وتطبيقات مصممة لسير عمل احترافي في مرحلة ما بعد الإنتاج.',contactTitle:'لنعمل معاً',contactText:'للتعاون في فيلم، مشروع Post Production أو للاستفسار عن البرامج والإضافات.',send:'إرسال الرسالة',name:'الاسم',email:'البريد الإلكتروني',subject:'الموضوع',message:'الرسالة',downloadNow:'تنزيل',details:'التفاصيل',learnMore:'اعرف المزيد'},
 en:{home:'Home',portfolio:'Portfolio',films:'Films',plugins:'Plugins & Software',dctl:'DCTL',downloads:'Downloads',about:'About',contact:'Contact',welcome:'WELCOME TO MY WORLD',heroTitle:'HUSSAIN KHAN',heroText:'I create stories that move people, and tools that empower creators.',watch:'Watch My Work',browse:'Browse Plugins',featured:'Featured Sections',featuredSub:'Films, creative tools and software I build.',viewMore:'View more',rights:'All rights reserved',latest:'Latest Products',latestSub:'Tools and applications designed for professional post-production workflows.',contactTitle:'Let’s work together',contactText:'For film collaboration, post-production work, or software and plugin inquiries.',send:'Send Message',name:'Name',email:'Email',subject:'Subject',message:'Message',downloadNow:'Download',details:'Details',learnMore:'Learn more'}
};
function setLang(lang){
 localStorage.setItem('hk-lang',lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[lang]?.[k])el.textContent=translations[lang][k]});
 document.querySelectorAll('[data-lang-label]').forEach(el=>el.textContent=lang==='ar'?'AR':'EN');
 document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.dataset.i18nPlaceholder;if(translations[lang]?.[k])el.placeholder=translations[lang][k]});
 document.dispatchEvent(new CustomEvent('hk-language-changed',{detail:{lang}}));
}
document.addEventListener('DOMContentLoaded',()=>{
 setLang(localStorage.getItem('hk-lang')||'ar');
 document.querySelectorAll('[data-lang-toggle]').forEach(b=>b.addEventListener('click',()=>setLang(document.documentElement.lang==='ar'?'en':'ar')));
 document.querySelectorAll('[data-menu-toggle]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.mobile-menu')?.classList.toggle('open')));
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
});
