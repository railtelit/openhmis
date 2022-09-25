

# Ha

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**


Apps: 
            admin.openhmis.erpapps.in
- Admin ->  APP_ADMIN   :   : ROLE : SUPER_ADMIN
          - SET HRP-GATEWAY , LIST - SERVICES 
        ->  HRP_ADMIN   :  openhmis.erpapps.in/admin : ROLE : HRP_ADMIN
          - ADD HIP / HIU SERVICES  


ENRTRY-POINT:  app.openhmis.erpapps.in
- HOME
          -- CHOOSE ROLE 
- HIPU
-       ->  HIP_ADMIN   : ROLE: HIP_ADMIN
        ->  HIU_ADMIN   : ROLE: HIU_ADMIN
          - MANAGE HPR / HR STAFFS / ACCOUNTING / PAYMENTS
        - ADD_ROLE  :   DOCTOR/NURSE/HELPDESK/FINANCE/INVENTORY/PHARMACY
        - CONTEXTS 
    
- /HELPDESK
        - SEARCH / REGISTER / MANAGE APPOINTMENTS
- /HPR
        - ROLES : DOCTOR , NURSE
        - DOCTOR 
              - ADD MEDICINE



--- 
       admin.
       hipu.    /admin,reception,accounts,/...
       hpr.     /dashboard