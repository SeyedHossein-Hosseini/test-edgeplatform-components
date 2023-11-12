public class ResponseResult
{
    // همیشه کد 0 به معنی موفق بودن باشه
    // کدهای 1 تا 9 کد های رزور شده ای باشه که برای خطاهای عمومی استفاده بشه
    // کدهای 10 به بالا می تونه کد های خاص هر درخواست باشه که در داکیومنت باید توضیح داده بشه
    
    //! if the response code is successful, get the class ResponseResult<TResult> : ResponseResult message
    public ResponseCode RespnseCode { get; set; }

    // متن خطایی که به کاربر باید نشون داده بشه        
    public string RespnseMessage { get; set; }

    // به جای فیلد بالا میشه از فیلد زیر استفاده کرد که با سایر خطاهامون یدست بشه
    // و موضوعات چند زبانه و اینا رو هم رو اون پیاده سازی کرد
    //! Exception
    public EkycException Exception { get; set; }
}

// این کلاس در صورتی استفاده بشه که درخواست  فقط در حالت موفق بودن خروجی داره و در حالت خطا خروجی نداره
public class ResponseResult<TResult> : ResponseResult
{
    public TResult Result { get; set; }
}

// این کلاس در صورتی استفاده بشه که درخواست  هم در حالت موفق بودن و هم در حالت خطا خروجی داره
public class ResponseResult<TResult, TFailure> : ResponseResult<TResult>
{
    public TFailure FailureResult { get; set; }
}

// ======================================================================================



public enum ResponseCode
{
    Success = 0,
    Exception = 1,
    Failed = 2,
    Unauthorized = 401,
}




// ======================================================================================




public class EkycException : Exception
{
    readonly Logger logger = LogManager.GetCurrentClassLogger();
    public string ErrorMessage { get; }
    public ExceptionCode ErrorCode { get; }
    public string TechnicalMessage { get; }
    public Exception Exception { get; }
    public DateTime TimeOccurred { get; }
    public EkycException(ExceptionCode code, string message, Exception innerException = null) : base(message, innerException)
    {
        ErrorCode = code;
        ErrorMessage = message;
        TechnicalMessage = innerException == null ? "" : innerException.Message;
        Exception = CommonConfig.RiseExceptionDetails ? innerException : null;
        TimeOccurred = DateTime.Now;
        logger.Error(innerException, $"{ErrorCode} - {message}");
    }
    public EkycException()
    {
    }

    public EkycException(string message) : base(message)
    {
        ErrorMessage = message;
        ErrorCode = ExceptionCode.unknown;
        TimeOccurred = DateTime.Now;
        logger.Error($"{ErrorCode} - {message}");
    }

    public EkycException(string message, Exception innerException) : base(message, innerException)
    {
        ErrorCode = ExceptionCode.unknown;
        ErrorMessage = message;
        TechnicalMessage = innerException == null ? "" : innerException.Message;
        Exception = CommonConfig.RiseExceptionDetails ? innerException : null;
        TimeOccurred = DateTime.Now;
        logger.Error(innerException, $"{ErrorCode} - {message}");
    }
}