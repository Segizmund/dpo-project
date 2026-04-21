<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cache;

class CourseController extends Controller
{
    protected $config;

    public function __construct()
    {
        $this->config = config('services.external_api');
    }

    public function index(Request $request)
    {
        $limit = $request->input('limit', 9);

        $tags = [
            'Войти в IT',
            'Войти в IT с нуля',
            'Освоить навык',
        ];

        $allExternalData = [];

        foreach ($tags as $tag) {
            try {
                $response = Http::withoutVerifying()
                    ->timeout(30)
                    ->withHeaders([
                        'X-API-KEY' => $this->config['key'],
                        'Accept'    => 'application/json',
                    ])->get($this->config['url'] . '/course/public', [
                        'course_tag' => $tag,
                    ]);

                if ($response->failed()) {
                    $allExternalData[$tag] = [
                        'status' => 'error',
                        'code'   => $response->status(),
                        'body'   => $response->body(),
                    ];
                } else {
                    $allExternalData[$tag] = $response->json() ?? $response->body();
                }
            } catch (\Exception $e) {
                $allExternalData[$tag] = [
                    'status'  => 'error',
                    'message' => $e->getMessage(),
                ];
            }
        }


        return Inertia::render('Welcome', [
            'entry' => $allExternalData['Освоить навык'],
            'helpChoose' => $allExternalData['Войти в IT с нуля'],
            'learnSkill' => $allExternalData['Освоить навык'],
            'seo' => [
                'title' => 'Главная',
                'description' => 'Добро пожаловать на платформу дополнительного профессионального образования. Обучаем IT-профессиям и современным методикам педагогики.',
            ]
        ]);
    }

    public function webinars_free(Request $request)
    {
        $cursor = $request->input('cursor'); 
        $limit = $request->input('limit', 3);

        try {
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->withHeaders([
                    'X-API-KEY' => $this->config['key'],
                    'Accept'    => 'application/json',
                ])->get($this->config['url'] . '/webinar/public/', [
                    'limit' => (int) $limit,
                    'next_cursor' => $cursor,
                ]);

            $data = $response->successful() 
                ? $response->json() 
                : ['webinars' => [], 'next_cursor' => null];

        } catch (\Exception $e) {
            \Log::error("Webinars API Error: " . $e->getMessage());
            $data = ['webinars' => [], 'next_cursor' => null];
        }

        return Inertia::render('Webinars', [
            'webinars'   => $data['webinars'] ?? [],
            'nextCursor' => $data['next_cursor'] ?? null,
            'seo' => fn() => [
                'title' => 'Бесплатные вебинары',
                'description' => 'Смотрите бесплатные уроки от экспертов.',
            ],
        ]);
    }

    public function webinars_paid(Request $request)
    {
        return Inertia::render('Webinars', [
            'seo' => [
                'title' => 'Платные вебинары',
                'description' => 'Углубленные программы обучения с практикой и обратной связью от менторов.',
            ],
            'type' => 'paid'
        ]);
    }

    public function courses(Request $request)
    {
        return Inertia::render('Courses', [
            'seo' => [
                'title' => 'Каталог всех курсов',
                'description' => 'Выберите подходящий курс: от разработки на Laravel до инклюзивного образования.',
            ]
        ]);
    }

    public function courseShow(Request $request)
    {
        return Inertia::render('CourseShow', [
            'seo' => [
                'title' => 'Каталог всех курсов',
                'description' => 'Выберите подходящий курс: от разработки на Laravel до инклюзивного образования.',
            ]
        ]);
    }

    public function webinarShow(Request $request)
    {
        return Inertia::render('WebinarShow', [
            'seo' => [
                'title' => 'Каталог всех курсов',
                'description' => 'Выберите подходящий курс: от разработки на Laravel до инклюзивного образования.',
            ]
        ]);
    }

    public function contacts()
    {
        return Inertia::render('Contacts', [
            'seo' => [
                'title' => 'Контакты',
                'description' => 'Контакты для свзяи с ДПО.',
            ]
        ]);
    }

    public function aboutUs()
    {
        return Inertia::render('AboutUs', [
            'seo' => [
                'title' => 'О нас',
                'description' => 'Информация про дополнительное профессиональное образование в Мелитополе, актуальная информация про проект',
            ]
        ]);
    }
}
