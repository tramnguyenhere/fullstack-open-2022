interface BodyValues {
    height: number,
    weight: number
}

const parseArguments = (args: Array<string>): BodyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not number!');
    }
}

export const calculateBmi = (a: number, b: number) => {
    const bmi = a / (b * b);
    if (bmi < 16.0) {
       return 'Underweight (Severe thinness)';
    } else if (bmi > 16.0 && bmi < 16.9) {
       return 'Underweight (Moderate thinness)';
    } else if (bmi > 17.0 && bmi < 18.4) {
       return 'Underweight (Mild thinness)';
    } else if (bmi > 18.5 && bmi < 24.9) {
       return 'Normal range';
    } else if (bmi > 25 && bmi < 29.9) {
       return 'Overweight (Pre-obese)';
    } else if (bmi > 30 && bmi < 34.9) {
       return 'Obese (Class I)';
    } else if (bmi > 35 && bmi < 39.9) {
       return 'Obese (Class II)';
    } else {
       return 'Obese (Class III)';
    } 

}

try {
    const {weight, height} = parseArguments(process.argv);
    calculateBmi(weight, height);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += 'Error' + error.message;
    }
    console.log(errorMessage); 
}