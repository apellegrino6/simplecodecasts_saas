class Contact < ActiveRecord::Base
  #active records validations
  validates :name, presence: true
  validates :email, presence: true
end