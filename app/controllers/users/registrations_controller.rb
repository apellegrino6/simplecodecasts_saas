class Users::RegistrationsController < Devise::RegistrationsController
    
    def create
        super do |resource|
           if params[:plan]
               # if there is a plan submitted with the form it will store it to the users plan id
               resource.plan_id = params[:plan]
               if resource.plan_id == 2
                   resource.save_with_payment
               else 
                   resource.save
               end
           end
        end
    end
    
end