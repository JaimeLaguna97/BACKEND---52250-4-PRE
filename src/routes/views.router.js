import { Router } from "express";

const router = Router ();

router.get('/realtimeproducts', (req,res) =>{
    //antes renderizaba index
    res.render('realtimeproducts');
});

export default router;