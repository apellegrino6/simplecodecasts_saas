class Users::RegistrationsController < Devise::RegistrationsController
    before_filter :select_plan, only: :new
    
    
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
    
    private
    def select_plan
        unless param[:plan] && (params[:plan] == '1' || params[:plan] == '2')
        flash[:notice] = "Please select a membership plan to sign up."
        redirect_to root_url
        end
    end
    
end