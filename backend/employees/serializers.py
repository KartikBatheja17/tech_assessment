from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Name must be at least 3 characters long")
        return value

    def validate_salary(self, value):
        if value <=0:
            raise serializers.ValidationError("Salary cannot be negative or zero")
        return value

    def validate_employee_code(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError("Employee code cannot be empty")
        return value

        