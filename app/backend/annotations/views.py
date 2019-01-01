from django.shortcuts import render
from . import serializers
from .models import Body, Selector, Target, Annotation
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from api.models import EventImage
from users.models import CustomUser
from rest_framework.views import APIView

# Create your views here.

class AnnotationCreateView(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Annotation.objects.all()
    serializer_class = serializers.AnnotationRWSerializer

    def get(self, request, *args, **kwargs):
        annotationList = []
        for annotation in Annotation.objects.all():
            serializer =  serializers.AnnotationRWSerializer(annotation)
            data = serializer.data
            body_object = Body.objects.get(id=data["body"])
            body_data = serializers.BodyRWSerializer(body_object).data
            data["body"] = body_data
            target_object = Target.objects.get(id=data["target"])
            target_data = serializers.TargetRWSerializer(target_object).data
            data["target"] = target_data
            selector_object = Selector.objects.get(id= data["target"]["selector"])
            selector_data = serializers.SelectorRWSerializer(selector_object).data
            data["target"]["selector"] = selector_data
            deleted_keys = []
            for key in data["target"]["selector"]:
                if data["target"]["selector"][key] is None:
                    deleted_keys.append(key)
            for key in deleted_keys:
                del data["target"]["selector"][key]
            deleted_keys = []
            for key in data["target"]:
                if data["target"][key] is None:
                    deleted_keys.append(key)
            for key in deleted_keys:
                del data["target"][key]
            del data["id"]
            del data["body"]["id"]
            del data["target"]["id"]
            del data["target"]["selector"]["id"]
            del data["image"]
            data["@context"] = data["context"]
            del data["context"]
            if data['creator'] is not None:
                creator = CustomUser.objects.get(pk=data['creator'])
                data['creator'] = (creator.id, creator.first_name, creator.last_name, creator.profile_pic.url, creator.is_private, creator.username)
            else:
                data['creator'] = (-1, "Deleted User", "", "", "false", "Deleted User")
            annotationList.append(data)
        return Response(annotationList)
    
    def post(self, request, *args, **kwargs):
        selector_data = {}
        target_data = {}
        annotation_data = {}
        selector_data["sel_type"] = request.data["target"]["selector"]["sel_type"]
        if request.data["target"]["selector"]["sel_type"] == "ImagePositionSelector":
            selector_data["type"] = request.data["target"]["selector"]["type"]
            selector_data["image_id"] = request.data["target"]["selector"]["image_id"]
            selector_data["width"] = request.data["target"]["selector"]["width"]
            selector_data["height"] = request.data["target"]["selector"]["width"]
            selector_data["x"] = request.data["target"]["selector"]["x"]
            selector_data["y"] = request.data["target"]["selector"]["y"]
            target_data["source"] = request.data["target"]["source"]
            event_image = EventImage.objects.get(pk=int(target_data["source"]))
            annotation_data["image"] = event_image

        elif request.data["target"]["selector"]["sel_type"] == "TextPositionSelector":
              selector_data["start"] = request.data["target"]["selector"]["start"]
              selector_data["end"] = request.data["target"]["selector"]["end"]

        selector = Selector(**selector_data)
        selector.save()
        target_data["selector"] =  selector
        target = Target(**target_data)
        target.save()
        body = Body(value=request.data["body"]["value"])
        body.save()

        annotation_data["creator"] = request.user
        annotation_data["body"] = body
        annotation_data["target"] = target
        annotation = Annotation(**annotation_data)

        annotation.save()
        data = serializers.AnnotationRWSerializer(annotation).data
        creator = CustomUser.objects.get(pk=data['creator'])
        data['creator'] = (creator.id, creator.first_name, creator.last_name, creator.profile_pic.url, creator.is_private, creator.username)

        return JsonResponse(data, safe=False)


class AnnotationDetail(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Annotation.objects.all()
    serializer_class = serializers.AnnotationRWSerializer

    def get(self, request, pk, format=None):
        annotation = Annotation.objects.get(pk=pk)
        serializer =  serializers.AnnotationRWSerializer(annotation)
        data = serializer.data
        body_object = Body.objects.get(id=data["body"])
        body_data = serializers.BodyRWSerializer(body_object).data
        data["body"] = body_data
        target_object = Target.objects.get(id=data["target"])
        target_data = serializers.TargetRWSerializer(target_object).data
        data["target"] = target_data
        selector_object = Selector.objects.get(id= data["target"]["selector"])
        selector_data = serializers.SelectorRWSerializer(selector_object).data
        data["target"]["selector"] = selector_data
        deleted_keys = []
        for key in data["target"]["selector"]:
            if data["target"]["selector"][key] is None:
                deleted_keys.append(key)
        for key in deleted_keys:
            del data["target"]["selector"][key]
        deleted_keys = []
        for key in data["target"]:
            if data["target"][key] is None:
                deleted_keys.append(key)
        for key in deleted_keys:
            del data["target"][key]
        del data["id"]
        del data["body"]["id"]
        del data["target"]["id"]
        del data["target"]["selector"]["id"]
        del data["image"]
        data["@context"] = data["context"]
        del data["context"]
        if data['creator'] is not None:
            creator = CustomUser.objects.get(pk=data['creator'])
            data['creator'] = (creator.id, creator.first_name, creator.last_name, creator.profile_pic.url, creator.is_private, creator.username)
        else:
            data['creator'] = (-1, "Deleted User", "", "", "false", "Deleted User")

        return Response(data)


    def delete(self, request, pk, format=None):
        annotation = self.get_object(pk)
        annotation.delete()
        return Response("Deleted.")