from django.utils import timezone
from django.shortcuts import redirect, render
from tests.models import Session, Test, Question, Answer, UserAnswer
from django.db.models import Count


def tests_view(request):
    tests = Test.objects.filter(publish=True, publish_date__lte=timezone.now())
    return render(request, 'tests.html', {'tests': tests})

def session_create(request, pk):
    questions = Question.objects.filter(test=pk)
    test = Test.objects.get(pk=pk)
    session = Session.objects.create(user=request.user, test=test)
    session.questions.set(questions)
    return redirect('test', session.pk)

def test_view(request, session_pk):
    session = Session.objects.get(pk=session_pk)
    questions = session.questions.all()
    if not questions:
        session.date_finished = timezone.now()
        session.save()
        return redirect('test_complited', session_pk)

    question = questions[0]
    if request.method == "POST":
        answer = Answer.objects.get(pk=request.POST['inp'], question=question)
        UserAnswer.objects.create(answer=answer, session=session)
        session.questions.remove(question)
        return redirect("test", session_pk)
    return render(request, "test.html", {'question': question, 'session_pk':session_pk})

def test_complited(request, session_pk):
    answers = UserAnswer.objects.filter(session=session_pk)
    session = Session.objects.get(pk=session_pk)

    return render(request, 'index.html', {'session': session})

def results(request):
    sessions = Session.objects.filter(user=request.user, date_finished__isnull=False)
    return render(request, 'results.html', {"sessions": sessions})

def result(request, session_pk):
    return

