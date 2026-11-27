export type PlanExercise = {
  name: string
  sets: string
}

export type PlanDay = {
  day: string
  focus: string
  exercises: PlanExercise[]
}

/** Rutina recomendada: 4 días, tren superior/inferior, solo 2 mancuernas. */
export const RECOMMENDED: PlanDay[] = [
  {
    day: 'Día 1',
    focus: 'Superior · empuje',
    exercises: [
      { name: 'Press de suelo con mancuernas', sets: '4 × 8-12' },
      { name: 'Press militar sentado', sets: '3 × 8-12' },
      { name: 'Aperturas en el suelo', sets: '3 × 12-15' },
      { name: 'Fondos en silla', sets: '3 × 8-12' },
      { name: 'Elevaciones laterales', sets: '3 × 12-15' },
      { name: 'Plancha', sets: '3 × 30-45 s' },
    ],
  },
  {
    day: 'Día 2',
    focus: 'Inferior · fuerza',
    exercises: [
      { name: 'Sentadilla goblet', sets: '4 × 10-12' },
      { name: 'Peso muerto rumano', sets: '4 × 8-12' },
      { name: 'Zancadas alternas', sets: '3 × 10 por pierna' },
      { name: 'Hip thrust en el suelo', sets: '3 × 12-15' },
      { name: 'Elevación de gemelos', sets: '3 × 15-20' },
      { name: 'Dead bug', sets: '3 × 10 por lado' },
    ],
  },
  {
    day: 'Día 3',
    focus: 'Superior · tirón',
    exercises: [
      { name: 'Remo a una mano', sets: '4 × 8-12 por lado' },
      { name: 'Remo inclinado con 2 mancuernas', sets: '3 × 10-12' },
      { name: 'Curl de bíceps', sets: '3 × 10-12' },
      { name: 'Curl martillo', sets: '3 × 10-12' },
      { name: 'Pájaros (deltoide posterior)', sets: '3 × 12-15' },
      { name: 'Curl de muñeca', sets: '3 × 15' },
    ],
  },
  {
    day: 'Día 4',
    focus: 'Inferior · unilateral + core',
    exercises: [
      { name: 'Sentadilla búlgara', sets: '3 × 10 por pierna' },
      { name: 'Subida al escalón (step-up)', sets: '3 × 10 por pierna' },
      { name: 'Puente de glúteo a una pierna', sets: '3 × 12 por lado' },
      { name: 'Paseo del granjero', sets: '3 × 30-40 m' },
      { name: 'Plancha lateral', sets: '3 × 30 s por lado' },
      { name: 'Hollow hold', sets: '3 × 20 s' },
    ],
  },
]

/** Split de 6 días con el estilo de la imagen, adaptado a 2 mancuernas. */
export const SPLIT_6: PlanDay[] = [
  {
    day: 'Lunes',
    focus: 'Pecho · hombro · tríceps',
    exercises: [
      { name: 'Press de suelo con mancuernas', sets: '4 × 8-12' },
      { name: 'Press militar sentado', sets: '3 × 8-12' },
      { name: 'Aperturas en el suelo', sets: '3 × 12-15' },
      { name: 'Fondos en silla', sets: '3 × 8-12' },
      { name: 'Extensión de tríceps sobre la cabeza', sets: '3 × 10-12' },
    ],
  },
  {
    day: 'Martes',
    focus: 'Espalda · bíceps · antebrazo',
    exercises: [
      { name: 'Remo a una mano', sets: '4 × 8-12 por lado' },
      { name: 'Remo inclinado con 2 mancuernas', sets: '3 × 10-12' },
      { name: 'Curl de bíceps', sets: '3 × 10-12' },
      { name: 'Curl martillo', sets: '3 × 10-12' },
      { name: 'Curl de muñeca', sets: '3 × 15' },
    ],
  },
  {
    day: 'Miércoles',
    focus: 'Pierna completa · abdomen',
    exercises: [
      { name: 'Sentadilla goblet', sets: '4 × 10-12' },
      { name: 'Peso muerto rumano', sets: '4 × 8-12' },
      { name: 'Zancadas alternas', sets: '3 × 10 por pierna' },
      { name: 'Elevación de gemelos', sets: '3 × 15-20' },
      { name: 'Plancha + dead bug', sets: '3 series' },
    ],
  },
  {
    day: 'Jueves',
    focus: 'Pecho · hombro · tríceps',
    exercises: [
      { name: 'Press inclinado en el suelo', sets: '4 × 8-12' },
      { name: 'Elevaciones laterales', sets: '3 × 12-15' },
      { name: 'Aperturas inclinadas', sets: '3 × 12-15' },
      { name: 'Flexiones', sets: '3 × al fallo técnico' },
      { name: 'Patada de tríceps', sets: '3 × 12-15' },
    ],
  },
  {
    day: 'Viernes',
    focus: 'Espalda · bíceps · antebrazo',
    exercises: [
      { name: 'Remo a una mano (agarre neutro)', sets: '4 × 8-12 por lado' },
      { name: 'Remo inclinado agarre supino', sets: '3 × 10-12' },
      { name: 'Curl alterno', sets: '3 × 10-12' },
      { name: 'Curl martillo cruzado', sets: '3 × 10-12' },
      { name: 'Paseo del granjero', sets: '3 × 30-40 m' },
    ],
  },
  {
    day: 'Sábado',
    focus: 'Pierna completa · abdomen',
    exercises: [
      { name: 'Sentadilla búlgara', sets: '3 × 10 por pierna' },
      { name: 'Peso muerto a una pierna', sets: '3 × 8 por lado' },
      { name: 'Step-up', sets: '3 × 10 por pierna' },
      { name: 'Puente de glúteo', sets: '3 × 15' },
      { name: 'Plancha lateral + hollow', sets: '3 series' },
    ],
  },
]

export type Meal = {
  name: string
  items: string
  protein: string
}

export const MEAL_DAY: Meal[] = [
  {
    name: 'Desayuno',
    items: '3 huevos + 2 tostadas integrales + palta + café o té',
    protein: '≈ 25 g',
  },
  {
    name: 'Almuerzo',
    items: 'Pollo a la plancha (150 g) + arroz (1 taza) + ensalada grande',
    protein: '≈ 40 g',
  },
  {
    name: 'Snack',
    items: 'Yogur griego natural (200 g) + fruta + avena (30 g)',
    protein: '≈ 20 g',
  },
  {
    name: 'Cena',
    items: 'Atún o pescado (150 g) + camote + verduras al vapor',
    protein: '≈ 35 g',
  },
]

export const PROTEIN_SOURCES: Array<{ food: string; protein: string }> = [
  { food: 'Pechuga de pollo (100 g)', protein: '31 g' },
  { food: 'Huevo (1 unidad)', protein: '6 g' },
  { food: 'Atún en agua (100 g)', protein: '23 g' },
  { food: 'Yogur griego (100 g)', protein: '9 g' },
  { food: 'Lentejas cocidas (1 taza)', protein: '18 g' },
  { food: 'Queso fresco (100 g)', protein: '17 g' },
  { food: 'Leche (1 vaso)', protein: '8 g' },
]
