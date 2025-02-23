document.addEventListener("DOMContentLoaded",()=>
{
    const mobileMenu=document.querySelector(".mobile-menu");
    const navLinks=document.querySelector(".nav-links")

    mobileMenu.addEventListener("click",()=>
    {
        navLinks.classList.toggle("active");
        mobileMenu.querySelector("i").classList.toggle("fa-times");

    })

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.remove('fa-times');
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link=>{
        link.addEventListener("click",(e)=>
        {
            e.preventDefault();
            navLinks.classList.remove("active")
        })
    })
})

document.addEventListener("DOMContentLoaded", function () {
    
    const navLinks = document.querySelectorAll(".nav-links a, .footer-links a");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault(); 
  
       
        const targetId = this.getAttribute("href").replace("#", "");
  
       
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          
          window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: "smooth",
          });
        }
      });
    });
  });
  