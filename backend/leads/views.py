from rest_framework import viewsets
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer
from audit_logs.models import AuditLog
from rest_framework.decorators import action
from rest_framework import status    


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer


    def perform_create(self, serializer):
        lead = serializer.save()
        AuditLog.objects.create(
            lead=lead,
            action="CREATE",
            old_data=None,
            new_data={
                'name':lead.name,
                'email':lead.email,
                'company':lead.company,
                'status':lead.status,
                'notes':lead.notes
            }
        )

    def perform_update(self, serializer):

        old_lead = self.get_object()

        old_data = {
            "name": old_lead.name,
            "email": old_lead.email,
            "company": old_lead.company,
            "status": old_lead.status,
            "notes": old_lead.notes
        }    

        lead = serializer.save()

        new_data = {
            "name": lead.name,
            "email": lead.email,
            "company": lead.company,
            "status": lead.status,
            "notes": lead.notes
        }
        AuditLog.objects.create(
            lead=lead,
            action='UPDATE',
            old_data=old_data,
            new_data=new_data
        )

    # DELETE
    def perform_destroy(self, instance):

        old_data = {
            "name": instance.name,
            "email": instance.email,
            "company": instance.company,
            "status": instance.status,
            "notes": instance.notes
        }

        AuditLog.objects.create(
            lead=instance,
            action='DELETE',
            old_data=old_data,
            new_data=None
        )

        instance.delete()


    @action(detail=True, methods=['post'], url_path='restore/(?P<audit_id>[^/.]+)')
    def restore_version(self, request, pk=None, audit_id=None):

        try:
            lead = self.get_object()

            audit_log = AuditLog.objects.get(id=audit_id)

            restore_data = audit_log.old_data   

            if not restore_data:
                return Response(
                    {"error": "No previous data available to restore."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            current_data = {
                "name": lead.name,
                "email": lead.email,
                "company": lead.company,
                "status": lead.status,
                "notes": lead.notes
            }

            lead.name = restore_data.get('name')
            lead.email = restore_data.get('email')
            lead.company = restore_data.get('company')
            lead.status = restore_data.get('status')
            lead.notes = restore_data.get('notes')

            lead.save()

            AuditLog.objects.create(
                lead=lead,
                action='RESTORE',
                old_data=current_data,
                new_data=restore_data
            )

            return Response({
                "message": "Lead restored successfully."
            })

        except AuditLog.DoesNotExist:
            return Response(
                {"error": "Audit log not found."},
                status=status.HTTP_404_NOT_FOUND
            )