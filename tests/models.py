from distutils.command.upload import upload
from pyexpat import model
from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class BaseModel(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    text = models.CharField(blank=True, max_length=250, verbose_name='Описание')

    class Meta:
        abstract = True

class Test(BaseModel):
    holder = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Создатель теста')
    publish = models.BooleanField(default=True, verbose_name='Опубликовать?')
    publish_date = models.DateTimeField(default=timezone.now(), blank=True, null=True, verbose_name='Дата публикации')

    def __str__(self) -> str:
        return self.text


class Question(BaseModel):
    test = models.ForeignKey('Test', on_delete=models.CASCADE, verbose_name='Тест')
    image = models.ImageField(upload_to='question_images', blank=True, null=True, verbose_name='Изображение к вопросу.')

    def __str__(self) -> str:
        return f'Вопрос {self.text} к тесту {self.test.text}'


class Answer(BaseModel):
    question = models.ForeignKey('Question', on_delete=models.CASCADE, verbose_name='Вопрoс')
    is_true = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.text} к вопросу {self.question.text}'

class UserAnswer(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    session = models.ForeignKey('Session', on_delete=models.CASCADE, related_name="user_answers")

    def is_true(self):
        return self.answer.is_true

class Session(BaseModel):
    date_finished = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, null=True)
    questions = models.ManyToManyField(Question)

    def count_true(self):
        answer_values = self.user_answers.values("answer_id")
        result = Answer.objects.filter(id__in=answer_values, is_true=True).count()
        return result
