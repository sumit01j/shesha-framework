import { IAnnotation } from "./model";


function canSubmit(data: IAnnotation[], minPoints: number, maxPoints: number,) {
    const numberOfPoints = data?.length;
    if (!!minPoints && numberOfPoints < minPoints) {
        return false;
    } else if (!!maxPoints && numberOfPoints > maxPoints) {
        return false;
    }
    return true;
}
function parseIntOrDefault(input: any, defaultValue: number = 0): number {
    const parsed = parseInt(input, 0);
    return isNaN(parsed) ? defaultValue : parsed;
}
function sortAnnotationData(data: IAnnotation[]) {
    let annotationLength = data?.length;
    const arrangedComments = data
        ?.filter(mark => !!mark?.comment)
        ?.sort((a, b) => {
            const order = [...a.comment?.split('.'), ...b.comment?.split('.')];
            return parseInt(order[0]) - parseInt(order[2]);
        })
        ?.map(({ comment, ...rest }, index) => {
            const [, commt] = comment?.split('.');
            return {
                ...rest,
                comment: `${index + 1}.${commt}`,
            };
        });

    if (data[annotationLength - 1]) {
        if (!data[annotationLength - 1]?.comment) {
            arrangedComments.push(data[annotationLength - 1]);
        }
    }

    return arrangedComments;

};
function getViewData(data: IAnnotation[], allowAddingNotes = false) {
    let viewData = data?.map((mrk, index) => {
        return {
            ...mrk,
            comment: allowAddingNotes ? `${index + 1}.` : `${index + 1}.X`,
        };
    });

    return viewData;
}

export { parseIntOrDefault, sortAnnotationData, getViewData, canSubmit };

