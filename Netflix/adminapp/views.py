from django.shortcuts import render

# Create your views here.
def Adminlogin(request):
    return render(request,"adminlogin.html")


def Home(request):
    movies = [
        {'id': 1, 'title': 'F1'},
        {'id': 2, 'title': 'Superman'},
        {'id': 3, 'title': 'Coolie'},
        {'id': 4, 'title': 'Avengers'},
        {'id': 5, 'title': 'Interstellar'},
    ]
    return render(request, 'home.html', {'movies': movies})
def Edit(request):
   return render(request, "edit.html")
def History(request):
   return render(request, "history.html")
def Pass(request):
   return render(request, "password.html")
def View_count(request):
   return render(request, "view_counts.html")