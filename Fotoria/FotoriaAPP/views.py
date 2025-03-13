from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import ListView, CreateView, UpdateView
from django.urls import reverse_lazy
from .models import Picture
from .forms import PictureForm
from django.template.loader import render_to_string

class PictureListView(ListView):
    model = Picture
    template_name = 'home.html'  
    context_object_name = 'listPicture'  

class PictureCreateView(CreateView):
    model = Picture
    form_class = PictureForm
    template_name = 'newPicture.html'
    success_url = reverse_lazy('home')
    

class UserRegisterView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/register.html'
    success_url = reverse_lazy('login') 


class PictureUpdateView(UpdateView):
    model = Picture
    form_class = PictureForm
    template_name = 'editPicture.html'

    # Método para determinar la URL de éxito después de un formulario válido
    def get_success_url(self):
        return reverse_lazy('home')  # Redirige a la vista 'home'

    def form_valid(self, form):
        # Procesar el formulario y si la solicitud es AJAX, devolver JSON
        response = super().form_valid(form)
        if self.request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True})
        return response

    def get(self, request, *args, **kwargs):
        # Si es una solicitud AJAX, cargar el formulario dinámicamente
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            self.object = self.get_object()  # Obtén el objeto que se está editando
            html_form = render_to_string(self.template_name, {'form': self.get_form()}, request=request)
            return JsonResponse({'html_form': html_form})  # Devolver el formulario en formato JSON
        return super().get(request, *args, **kwargs)  # Comportamiento estándar de la vista UpdateView




