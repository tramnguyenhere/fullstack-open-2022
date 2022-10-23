interface ExerciseData {
    target: number;
    dailyExerciseData: Array<number>
}

const parseExerciseArgument = (args: Array<string>): ExerciseData => {
    if (args.length < 3) throw new Error('Not enough arguments');
    let check = true;
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            check = false;
        }
    }
    if (!isNaN(Number(args[2])) && check) {
        let data = [];
        for (let i = 3; i < args.length; i++) {
            data.push(Number(args[i]))
        }
        return { 
            target: Number(args[2]),
            dailyExerciseData: data 
        }
    } else {
        throw new Error('Provided values were not number!');
    }
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

const exerciseCalculator = (target: number, dailyExerciseData: Array<number>): Result => {
    const periodLength = dailyExerciseData.length;
    const trainingDays = dailyExerciseData.filter(d => d > 0).length;
    const average = dailyExerciseData.reduce((sum, a) => sum + a, 0) / periodLength;
    const success = average >= target ? true : false;
    
    let rating;
    let ratingDescription;

    if (average < target) {
        rating = 1;
        ratingDescription = 'not too bad but could be better';
    } else if (average === target) {
        rating = 2;
        ratingDescription='well done'
    } else {
        rating = 3;
        ratingDescription='bravooo!'
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
}

try {
    const {target, dailyExerciseData} = parseExerciseArgument(process.argv);
        exerciseCalculator(target, dailyExerciseData);
        console.log( exerciseCalculator(target, dailyExerciseData));
        console.log(target,dailyExerciseData);
    
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += 'Error' + error.message;
    }
    console.log(errorMessage); 
}
